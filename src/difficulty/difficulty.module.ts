import { Module } from '@nestjs/common';
import { DifficultyController } from './difficulty.controller';
import { DifficultyService } from './difficulty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Difficulty])
  ],
  controllers: [DifficultyController],
  providers: [DifficultyService]
})
export class DifficultyModule {}
