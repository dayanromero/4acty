import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleApp } from './entity/module.entity';
import { ModuleAppService } from './modules.service';
import { PointsUserService } from 'src/points-user/points-user.service';
import { PointsUser } from 'src/points-user/entity/points-user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ModuleApp,PointsUser])
],
  controllers: [ModulesController],
  providers: [ModuleAppService,PointsUserService]
})
export class ModulesModule {}
