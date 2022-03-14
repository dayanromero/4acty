import { Injectable } from '@nestjs/common';
import { Difficulty } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestApp } from 'src/test/entity';

@Injectable()
export class DifficultyService {
    constructor(
        @InjectRepository(Difficulty)
        private readonly difficulty: Repository<Difficulty>
    ){}

    async getManyToTest(test: TestApp): Promise<Difficulty[]> {
        const recordsDifficultys = await this.difficulty.createQueryBuilder('ra')
          .where({ test: test })
          .getMany();
        return recordsDifficultys;
    }
    getRatings(difficultysRecords: Difficulty[], poinst: number) {
        let quealifyGenerate: number = 0;
        for (let index = 0; index < difficultysRecords.length; index++) {
            const element = difficultysRecords[index];
            let valores = element.values.split(",");
            if (this.validValue(parseInt(valores[0]), parseInt(valores[1]), poinst)) {
            quealifyGenerate = element.id;
            }
        }
        return quealifyGenerate;
    }
    validValue(min: number, max: number, value: number): boolean {
    if ((value >= min) && (value <= max)) {
        return true;
    }
    return false;
    }
}
