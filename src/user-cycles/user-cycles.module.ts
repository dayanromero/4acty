import { Module } from '@nestjs/common';
import { UserCyclesController } from './user-cycles.controller';
import { UserCyclesService } from './user-cycles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCycles } from './entity';
import { Cycle } from 'src/cycles/entity';
import { CyclesService } from 'src/cycles/cycles.service';
import { UserCategoryService } from 'src/user-category/user-category.service';
import { UserCategory } from 'src/user-category/entity';
import { ModuleAppService } from '../modules/modules.service';
import { ModuleApp } from 'src/modules/entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserCycles,Cycle,UserCategory,ModuleApp])
  ],
  controllers: [UserCyclesController],
  providers: [UserCyclesService,CyclesService,UserCategoryService,ModuleAppService]
})
export class UserCyclesModule {}
