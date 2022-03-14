import { Module } from '@nestjs/common';
import { CyclesController } from './cycles.controller';
import { CyclesService } from './cycles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cycle])
  ],
  controllers: [CyclesController],
  providers: [CyclesService]
})
export class CyclesModule {}
