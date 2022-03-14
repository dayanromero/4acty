import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { Challanges } from './entity/challange.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeQualifyService } from 'src/challenge-qualify/challenge-qualify.service';
import { ChallangeQualify } from 'src/challenge-qualify/entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Challanges,ChallangeQualify])
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService,ChallengeQualifyService]
})
export class ChallengesModule {}
