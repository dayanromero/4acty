import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersController } from './parameters.controller';
import { Parameter } from './entity/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Antecendent,Habit } from './factory/types';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parameter])
  ],
  providers: [ParametersService],
  controllers: [ParametersController]
})
export class ParametersModule {}
