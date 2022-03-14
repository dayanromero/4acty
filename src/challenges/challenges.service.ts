import { Injectable } from '@nestjs/common';
import { Challanges } from 'src/challenges/entity/challange.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestApp } from 'src/test/entity';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challanges)
        private readonly Challanges: Repository<Challanges>
    ){}
    async getChallange(id: number){
        return await this.Challanges.createQueryBuilder('chall')
        .where({ test: id })
        .getMany();
    }
}
