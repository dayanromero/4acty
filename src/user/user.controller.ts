import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, BadRequestException, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto, EditUserGenderDto, EditUserMobileDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { Auth,User } from 'src/common/decorators';
import {  RolesBuilder,InjectRolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { User as UserEntity } from './entity';
import { TransformInterceptor } from '../shared/http-response';
import { MailUserService } from 'src/common/services/mails-user/mail-user.service';
import { generateRandom } from 'src/common/helpers/operationsMath';
import { PasswordResetsService } from './password-resets.service';

@ApiTags('User')
@Controller('user')
@UseInterceptors(TransformInterceptor)
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly passwordResetsService: PasswordResetsService,

    @InjectRolesBuilder()
    private readonly rolesBuilder:RolesBuilder,
    private readonly mailUserService:MailUserService
  ) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();
    return { data }
  }


  @Get(':id')
  async getOne(
    @Param('id') id: number,
  ) {
    const data = await this.userService.getOne(id);
    return { data }
  }
  

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER
  })
  //verifica si el usuario tiene permisos para poder modificar el usuario
  @Post()
  async createOne(
    @Body() dto: CreateUserDto
  ) {
    const data = await this.userService.createOne(dto)
    return { message: 'User created', data }
  }


  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity
  ) {
    
    const data = await this.userService.editOne(id, dto)
    return { message: 'User edited', data }
  }

  @Put(':id/gender')
  async editGender(
    @Param('id') id: number,
    @Body() dto: EditUserGenderDto,
    @User() user: UserEntity
  ) {
    const data = await this.userService.editGender(id, dto)
    return { message: 'User edited', data }
  }

  @Put(':id/mobile')
  async editMobile(
    @Param('id') id: number,
    @Body() dto: EditUserMobileDto,
    @User() user: UserEntity
  ) {
    const data = await this.userService.editMobile(id, dto)
    return { message: 'User edited', data }
  }


  @Delete(':id')
  async deleteOne(
    @Param('id') id: number,
  ) {
    const data = await this.userService.deleteOne(id)
    return { message: 'User deleted', data }
  }

  
  //creamos el codigo para la recuperación de contraseña
  @Post('/forgotPassword')
  async forgotPassword(
    @Body() dto: any
  ) {
    const user = await this.userService.findOneEmail(dto.email);
    if (!user) throw new BadRequestException('No existe información');
    let  infoMail:any  = new Object();
    infoMail.codigo = generateRandom();
    infoMail.to = user.email;
    const forgotPassword = await  this.passwordResetsService.saveTokenRestorePassword(infoMail.to,infoMail.codigo)
    const sendMail = await this.mailUserService.restorePassword(infoMail);
    if (!sendMail) throw new BadRequestException('Error al enviar el Email');
    return { message: 'Código enviado a su correo', data:{} }
  }

  @Post('/codeValid')
  async validCodePassword(
    @Body() dto: any
  ) {

    let findExistCode = await  this.passwordResetsService.getOneCode(dto.email,dto.code);
    
    if( new Date() > new Date((await findExistCode).refreshtokenexpires))throw new BadRequestException('El Código ya expiro');
    return { message: 'Código Valido', data:findExistCode }
  }


  @Patch('/restorePassword')
  async restorePassword(
    @Body() dto: any
  ) {
    let findExistCode = await  this.userService.changePassword(dto.email,dto.password);
    return { message: 'Contraseña Actualizada', data:{} }
  }
  

}
