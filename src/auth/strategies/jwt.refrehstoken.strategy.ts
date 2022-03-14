import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  
    constructor(private userService:UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
            ignoreExpiration: true,
            secretOrKey: 'MyStrongSecret',
            passReqToCallback:true
        });
  }
 
  async validate(req,payload: any) {

        
    var user = await this.userService.getOne(payload.sub);
   
    if(!user){
        throw new UnauthorizedException();
    }
    if(req.body.refreshToken != (await user).refreshtoken){
        throw new UnauthorizedException();
    }
    if( new Date() > new Date((await user).refreshtokenexpires)){
      throw new UnauthorizedException();
    }
    return user;
  }
}