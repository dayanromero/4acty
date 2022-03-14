import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResets, User } from './entity';
import { MailUserService } from 'src/common/services/mails-user/mail-user.service';
import { PasswordResetsService } from './password-resets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,PasswordResets])
  ],
  controllers: [UserController],
  providers: [UserService,MailUserService, PasswordResetsService],
  exports: [UserService]
})
export class UserModule {}
