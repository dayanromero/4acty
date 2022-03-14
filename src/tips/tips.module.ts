import { Module } from '@nestjs/common';
import { TipsService } from './tips.service';
import { TipsController } from './tips.controller';
import { Tip } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tip])
  ],
  providers: [TipsService],
  controllers: [TipsController]
})
export class TipsModule {}
