import { Injectable, BadRequestException } from '@nestjs/common';
import { ChallangeQualify } from './entity/challange-qualify';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDtoQualifyChallange } from './dto';
import { User } from 'src/user/entity';
import { TestApp } from 'src/test/entity';
import { Challanges } from 'src/challenges/entity/challange.entity';

export interface infoResult{
    user?:User;
    test?:number;
    challange?:number;
    
}


@Injectable()
export class ChallengeQualifyService {
    constructor(
        @InjectRepository(ChallangeQualify)
        private readonly challangeQualify: Repository<ChallangeQualify>
    ) { }

    async createOne(dto: any) {

        // const challangeExist = await this.challangeQualify.findOne({where: { challange: dto.challange, user: dto.user}});
        // if (challangeExist) throw new BadRequestException('Challange Test already registered');
        // try {
            
            const newQualifyChallange = this.challangeQualify.create(dto);
            const QualifyChallange = await this.challangeQualify.save(newQualifyChallange);
    
            // if (!QualifyChallange) throw new BadRequestException('Error registred challangeQualify');
            return { "sum_total": await this.getQualifyChallangeForUser(dto.user,dto.test),"total_record":await this.getCountChallangeForUser(dto.user,dto.test)}
        // } catch (error) {
        //     throw new BadRequestException('Challange Test already registered');
        // }

    }

    async getQualifyChallangeForUser(user: User,test:TestApp) {
        const { sum } = await this.challangeQualify
            .createQueryBuilder("challangeQualify")
            .select("SUM(challangeQualify.qualification)", "sum")
            .where({ user: user,test: test })
            .getRawOne();
        return sum;
    }

    async getCountChallangeForUser(user: User,test:TestApp) {
        const  count  = await this.challangeQualify
            .createQueryBuilder("challangeQualify")
            .where({ user: user,test: test })
            .getCount();
        return count;
    }
    async getCountChallangeForUserSpecific(user: User,test:number,challange:number) {
        const  count  = await this.challangeQualify
            .createQueryBuilder("challangeQualify")
            .where({ user: user,test: test,challange: challange })
            .getCount();
        return count;
    }
    
    async deleteQualifyChallangeForUser(dto:any) {
          
          
          
            const getQuealifysUserAppView = await this.challangeQualify.find({where: { challange: dto.challange, user: dto.user,viewApp:dto.viewApp}});
            return await this.challangeQualify.remove(getQuealifysUserAppView);
    }

    async getResults(user:User){

        const element:infoResult = {}, cart = [];
        
        // let dto = {test}

        // if(dto.test){

            // }
        // if(dto.challange){
        //     element.challange = dto.challange;
        // }
        element.test = 1;
        element.user = user;
        


        const getQuealifysUserAppView = await this.challangeQualify.createQueryBuilder('qua')
        .where(element) 
        .select(['qua.id as id','qua.qualification as qualification','chall.name as challenge'])
        .leftJoin('qua.challange', 'chall')
        // .getMany();
        .getRawMany();
        for (let index = 0; index < getQuealifysUserAppView.length; index++) {
            getQuealifysUserAppView[index]['percentage'] = getQuealifysUserAppView[index]['qualification']*10;
            getQuealifysUserAppView[index]['note'] = await this.generateNote(getQuealifysUserAppView[index]['qualification']);
        }

        return getQuealifysUserAppView;
    }
    /**
     * Generar la nota de la calificación
     * 1,4 es Regular
     * 5,8 es Bueno
     * 9,10 es excelente
     * @param value 
     * @param max 
     */
    generateNote(value){
        let noteString = ''; 
        if(value>=1 && value<=4){
            noteString = 'Regular!';
        }
        if(value>=5 && value<=8){
            noteString = 'Bueno';
        }
        if(value>=9 && value<=10){
              
            noteString = 'Excelente';
        }
        
        return  noteString;
    }


}
