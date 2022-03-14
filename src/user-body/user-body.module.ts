import { Module } from '@nestjs/common';
import { UserBodyService } from './user-body.service';
import { UserBodyController } from './user-body.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBodyEntity } from './entity';
import { User } from 'src/user/entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserBodyEntity,User])
  ],
  controllers: [UserBodyController],
  providers: [UserBodyService]
})
export class UserBodyModule {}
