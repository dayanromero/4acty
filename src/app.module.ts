import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  { AccessControlModule } from 'nest-access-control'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } from './config/constants';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';
import { ModulesModule } from './modules/modules.module';
import { TestModule } from './test/test.module';
import { FieldsFormsModule } from './fields-forms/fields-forms.module';
import { FormToTestModule } from './form-to-test/form-to-test.module';
import { FormGroupModule } from './form-group/form-group.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengeQualifyModule } from './challenge-qualify/challenge-qualify.module';
import { PointsUserModule } from './points-user/points-user.module';
import { RatingsModule } from './ratings/ratings.module';
import { CategoryModule } from './category/category.module';
import { DifficultyModule } from './difficulty/difficulty.module';
import { UserCategoryModule } from './user-category/user-category.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserBodyModule } from './user-body/user-body.module';
import { CyclesModule } from './cycles/cycles.module';
import { UserCyclesModule } from './user-cycles/user-cycles.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailUserService } from './common/services/mails-user/mail-user.service';
import { UploadS3Service } from './common/services/upload-s3/upload-s3.service';
import { TipsModule } from './tips/tips.module';
import { NotificationModule } from './notification/notification.module';
import { ParametersModule } from './parameters/parameters.module';




@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      })
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'mail.godevelop.co',
          port: 465,
          secure:true,
          // requireTLC:true,
          auth: {
            user: "test@godevelop.co",
            pass: "123Test@te",
          },
        },
        defaults: {
          from:'<test@godevelop.co>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AccessControlModule.forRoles(roles),
    UserModule, AuthModule, ModulesModule, TestModule, FieldsFormsModule, FormToTestModule, FormGroupModule, ChallengesModule, ChallengeQualifyModule, PointsUserModule, RatingsModule, CategoryModule, DifficultyModule, UserCategoryModule, UserBodyModule, CyclesModule, UserCyclesModule, TipsModule, NotificationModule, ParametersModule
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_FILTER,
    useClass:HttpErrorFilter
  }, MailUserService, UploadS3Service],
})
export class AppModule {}
