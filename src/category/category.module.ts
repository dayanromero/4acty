import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entity';
import { UserCategoryService } from '../user-category/user-category.service';
import { UserCategory } from 'src/user-category/entity';
import { ModuleApp } from 'src/modules/entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Category,UserCategory])
  ],
  controllers: [CategoryController],
  providers: [CategoryService,UserCategoryService]
})
export class CategoryModule {}
