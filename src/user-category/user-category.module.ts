import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';


import { UserCategoryController } from './user-category.controller';
import { UserCategoryService } from './user-category.service';
import { UserCategory } from './entity';
import { ModuleApp } from 'src/modules/entity';
import { ModuleAppService } from '../modules/modules.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCategory,ModuleApp])
  ],
  controllers: [UserCategoryController],
  providers: [UserCategoryService,ModuleAppService]
})
export class UserCategoryModule {}
