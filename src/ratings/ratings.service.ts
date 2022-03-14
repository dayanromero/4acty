import { Injectable } from '@nestjs/common';
import { Raiting } from './entity/raitings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Raiting)
    private readonly raiting: Repository<Raiting>
  ) { }
  async getManyToGroup(id: any): Promise<Raiting[]> {
    const recordsRaiting = await this.raiting.createQueryBuilder('ra')
      .where({ group_qualifies_id: id })
      .getMany();
    return recordsRaiting;
  }
  getRatings(raitingRecords: Raiting[], poinst: number) {
    let quealifyGenerate: String = '0';
    for (let index = 0; index < raitingRecords.length; index++) {
      const element = raitingRecords[index];
      let valores = element.value.split(",");
      if (this.validValue(parseInt(valores[0]), parseInt(valores[1]), poinst)) {
        quealifyGenerate = element.points;
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

