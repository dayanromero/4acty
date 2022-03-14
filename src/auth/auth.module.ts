import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy } from './strategies';
import { LocalAuthGuard } from './guards';
import { JWT_SECRET } from '../config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity';
import { UploadS3Service } from 'src/common/services/upload-s3/upload-s3.service';
import { MulterExtendedModule } from 'nestjs-multer-extended-s3';


@Module({
    // "servicios y juagasdas que se necesitan"
    imports:[
      MulterExtendedModule.register({
        awsConfig: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          // region: 'AWS_REGION_NEAR_TO_YOU',
          // ... any options you want to pass to the AWS instance
          // ACL:'public-read'
        },
        bucket: '4acty-multimedia',
        basePath: 'profile',
        // fileSize: 1 * 50 * 50,
      }),
      TypeOrmModule.forFeature([User]),
        PassportModule.register({
          defaultStrategy:'jwt'
        }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config:ConfigService) =>({
              secret:config.get<string>(JWT_SECRET),
              signOptions:{expiresIn:'1h'}
          }),
          

        }),
        UserModule
    ],
  providers: [AuthService,LocalStrategy,LocalAuthGuard,JwtStrategy,JwtRefreshTokenStrategy,UploadS3Service],
  controllers: [AuthController]
})
export class AuthModule {}
