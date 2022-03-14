import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raiting } from './entity/raitings.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Raiting])
  ],
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule {}
