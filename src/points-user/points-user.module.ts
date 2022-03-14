import { Module } from '@nestjs/common';
import { PointsUserService } from './points-user.service';
import { PointsUserController } from './points-user.controller';
import { PointsUser } from './entity/points-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([PointsUser])
  ],
  providers: [PointsUserService],
  controllers: [PointsUserController]
})
export class PointsUserModule {}
