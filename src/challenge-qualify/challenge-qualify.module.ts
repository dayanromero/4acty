import { Module } from '@nestjs/common';
import { ChallengeQualifyService } from './challenge-qualify.service';
import { ChallengeQualifyController } from './challenge-qualify.controller';
import { ChallangeQualify } from './entity/challange-qualify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from 'src/ratings/ratings.service';
import { Raiting } from 'src/ratings/entity/raitings.entity';
import { PointsUserService } from 'src/points-user/points-user.service';
import { PointsUser } from 'src/points-user/entity/points-user.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity';
import { DifficultyService } from '../difficulty/difficulty.service';
import { Difficulty } from 'src/difficulty/entity';
import { TestApp } from 'src/test/entity';
import { TestService } from '../test/test.service';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/category/entity';
import { UserCategoryService } from '../user-category/user-category.service';
import { UserCategory } from 'src/user-category/entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ChallangeQualify,Raiting,PointsUser,User,Difficulty,TestApp,Category,UserCategory])
  ],
  providers: [ChallengeQualifyService,RatingsService,PointsUserService,UserService,DifficultyService,TestService,CategoryService,UserCategoryService],
  controllers: [ChallengeQualifyController]
})
export class ChallengeQualifyModule {}
