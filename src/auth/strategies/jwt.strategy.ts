import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from "src/config/constants";




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
    private userService: UserService,
        private config:ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:config.get<string>(JWT_SECRET)

        })
    }

    async validate(payload:any){
        const {sub:id} = payload;
        return await this.userService.getOne(id);
    }
}