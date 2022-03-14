import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestApp } from './entity/test.entity';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { ModuleApp } from 'src/modules/entity';

@Module({
    imports:[
      TypeOrmModule.forFeature([TestApp,ModuleApp])
  ],
    controllers: [TestController],
    providers: [TestService]
  })
export class TestModule {}
