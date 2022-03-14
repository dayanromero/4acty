import { Controller, Get, Post, UseGuards, Body, UseInterceptors, Request, HttpStatus, Put, UploadedFile, Req, Res, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { User } from '../common/decorators/user.decorator';
import { User as UserEntity } from 'src/user/entity';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { LoginDto } from './dtos/login.dto';
import { TransformInterceptor } from '../shared/http-response';
import { CreateUserDto, EditUserDto } from 'src/user/dtos';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from 'src/common/services/upload-s3/upload-s3.service';
import { validateExtension } from 'src/common/helpers/';
import { FileUpload } from 'src/common/interfaces';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended-s3';


 
@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly uploadS3Service: UploadS3Service
    ){

    }
    //middleware encargado de valdiar la autenticacion del usuario
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        //decorador encargado de devolver el usuario
        @Request() req,
        @Body() loginDto:LoginDto,
        @User() user:UserEntity
    ){
    const data = await this.authService.login(user)
     return {
         message:'Login Existoso',
         data:data,
         status:1
     }
    }
    
    @UseGuards(AuthGuard('jwt-refreshtoken'))
    @Post('refresh')
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserEntity })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async refreshToken(
        @Request() req,
        @User() userRef:UserEntity
    ){
        let refresh = await this.authService.login(userRef);
        const {user, ...tokenRefresh} = refresh;
        return {
            message:'Refresh Existoso',
            data:tokenRefresh,
            status:1
        } 
    }
    

    @Auth()
    @Get('profile')
    profile(@User() user:UserEntity){

        const {refreshtoken,refreshtokenexpires, ...userSet} = user;
        return {data:userSet};
    }

    @Post('profile')
    async createOne(
    @Body() dto: CreateUserDto) {
        const data = await this.authService.createOne(dto)
        return { message: 'User created', data }
    }

    @Auth()
    @Put('profile')
    async updateProfile(@Body() dto: EditUserDto,
    @User() user: UserEntity){
        
        const data = await this.userService.editOne(user.id, dto)
        const {refreshtoken,refreshtokenexpires, ...userSet} = data;
        return { message: 'User edited', data:userSet }
    }

    @Auth()
    @Get('logout')
    async logout(@User() user:UserEntity){
        await this.userService.saveorupdateRefreshToke('',user.id.toString(),'');
        // let logout = await this.authService.logout(user);
        return { message: 'logout exitoso', data:{}}
    }
    
    @Auth()
    @Post('upload')
    @UseInterceptors(AmazonS3FileInterceptor('picture',{
        resize: { width: 300, height: 300 },
      }))
    async uploadFile(
        @UploadedFile() picture:FileUpload,
        @User() user:UserEntity
    ) {
     
        if(picture!=null){

            let imageUpload = await this.uploadS3Service.deleteImage(user.image_profile);              
            await this.userService.updateImage(picture['Location'],user.id.toString());    
            return {data:picture['Location'],message:'Imagen Actualizada'}
        }else{
            throw new NotFoundException('Imagen no valida');
        }

    }

    @Auth()
    @Post('uploaddebug')
    findAll(@Req() request: Request) {
        
        return {data:request.body}
      }

}
