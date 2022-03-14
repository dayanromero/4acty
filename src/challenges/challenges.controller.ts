import { Controller, Get, Param } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Auth,User } from 'src/common/decorators';
import { TestApp } from 'src/test/entity';
import { ChallengeQualifyService } from 'src/challenge-qualify/challenge-qualify.service';
import {  User as UserEntity } from 'src/user/entity';
import { Challanges } from 'src/challenges/entity/challange.entity';

@Controller('challenges')
export class ChallengesController {
    constructor(
        private readonly challageService: ChallengesService,
        private readonly challengeQualifyService: ChallengeQualifyService,
    ){}
    @Auth()
      //verifica si el usuario tiene permisos para poder modificar el usuario
      @Get('/test/:id')
      async getOne(
        @Param('id') id: number,
        @User() user: UserEntity
      ) {
        
        // return this.challengeQualifyService.getCountChallangeForUserSpecific(user,id,1);
         const challanges = await this.challageService.getChallange(id)
          let total_challanges_completed = 0;
          for (let index = 0; index < challanges.length; index++) {
            const element = challanges[index];
            let challangeUser = await this.challengeQualifyService.getCountChallangeForUserSpecific(user,id,element.id);
              
            element['completed']=false;
            if(challangeUser){
              total_challanges_completed++;
              element['completed']=true;
            }
            
          }
          let response = {"total_completed":total_challanges_completed,"challanges":challanges}
          
          return { data:response }
      }
}
