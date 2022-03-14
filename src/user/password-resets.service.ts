import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResets } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordResetsService {
    constructor(
        @InjectRepository(PasswordResets)
        private readonly passwordResets: Repository<PasswordResets>,
    ){}
    async getOneEmail(email: string) {
        const user = await this.passwordResets.find({where:{email:email}});
        return user;
    }

    async getOneCode(email: string,code:number) {
        
        const user = await this.passwordResets.findOne({email,code});
        if(!user) throw new BadRequestException('Información errada');
        return user;
    }

    async saveTokenRestorePassword(email,code){
        
        let existEmail =await this.getOneEmail(email);
    
        if(existEmail.length>0){
            this.deteleRestorePasswordToEmail(existEmail[0]);
        }
        var now = new Date();
        var time = now.getTime();
        now.setTime(now.getTime() + 1 * 3600 * 1000);
  
       let passwordResetOb = new  PasswordResets();
       passwordResetOb.email=email;
       passwordResetOb.refreshtokenexpires=now.toUTCString();
       passwordResetOb.code = code;
     
        const newResetPass = await this.passwordResets.create(passwordResetOb)
        const resetPass = await this.passwordResets.save(newResetPass);  
        return resetPass;
      }
    async deteleRestorePasswordToEmail(passwordReset:PasswordResets){
        
        return await this.passwordResets.remove(passwordReset);
    }
}
