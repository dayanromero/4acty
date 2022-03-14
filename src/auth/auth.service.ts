import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { User } from 'src/user/entity';
import { JwtService } from '@nestjs/jwt';
import { uid, suid } from 'rand-token';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dtos/create-user.dto';
var randtoken = require ( 'rand-token' );
@Injectable()
export class AuthService {
    // const token = uid(12);
//   const otherToken = suid(16);
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async validateUser(email:string, pass:string): Promise<any> {
        const userRecord = await this.userService.findOne({email});
        
        
        if(userRecord &&  compareSync(pass,userRecord.password)){
            return userRecord;
        }

        return null;
    }
    async login(userAuth:User){
        
        
        const {id,password,refreshtokenexpires,refreshtoken,...user} = userAuth;
         const payload ={sub:id};
           
         return { 
            user,
             accessToken:this.jwtService.sign(payload),
             refreshToken: await this.generateRefreshToken(userAuth.id)
             
         }
    }
    async generateRefreshToken(userId):  Promise<string>{
        var refreshToken = randtoken.generate(16);
        var expirydate =new Date();
        expirydate.setDate(expirydate.getDate() + 6);
        await this.userService.saveorupdateRefreshToke(refreshToken, userId, expirydate);
        return refreshToken
      }

      async createOne(dto: CreateUserDto) {
        const userExist = await this.userRepository.findOne({ email: dto.email });
        if (userExist) throw new BadRequestException('User already registered with email');
    
        const newUser = this.userRepository.create(dto)
        const user = await this.userRepository.save(newUser)
    
        const {id,password,refreshtokenexpires,refreshtoken,...userAuth} = user;
        const payload ={sub:id};
        return { 
           user,
            accessToken:this.jwtService.sign(payload),
            refreshToken: await this.generateRefreshToken(user.id)
            
        }
      }
    
}
