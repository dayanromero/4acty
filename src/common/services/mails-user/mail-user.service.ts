import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailUserService {
    constructor(private readonly mailerService: MailerService) {}

    async  restorePassword(infoMail:any):Promise<boolean> {
      let status:boolean;
        await this
          .mailerService
          .sendMail({
            to: infoMail.to, // list of receivers
            from: 'test@godevelop.co "Verificación Codigo"', // sender address
            subject: 'Código de recuperación de contraseña', // Subject line
            text: 'welcome', // plaintext body
            html: `<h3><b>Codigó de recuperación:</b> </h3> 🔑 ${infoMail.codigo}`, // HTML body content
          })
          .then((success) => {
            status = true;
          })
          .catch((err) => {
            status =  false;
          });
          return status;
      }
}
