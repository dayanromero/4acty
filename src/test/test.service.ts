import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto, EditTestDTO } from './dto';
import { TestApp } from './entity';
import { ModuleApp } from 'src/modules/entity';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestApp)
        private readonly testApp: Repository<TestApp>
    ){}

    async getMany() {
        return await this.testApp.find()
      }

      async getOne(id: number) {
        const testApp = await this.testApp.findOne(id);
        if (!testApp) throw new NotFoundException('testApp does not exists')
        return testApp;
      }

      async getOneWhitModule(id: TestApp) {
        const testApp = await this.testApp.createQueryBuilder('tes')
        .where({ id: id })
        .select(['tes.id','tes.title','tes.module'])
        .getRawMany();
        if (!testApp) throw new NotFoundException('testApp does not exists')
        return testApp;
      }

      async getWhitModule(id: number) {
        const testApp = await this.testApp.createQueryBuilder('tes')
        .where({ module: id })
        .select(['tes.id','tes.title','tes.module'])
        .getRawMany();
        if (!testApp) throw new NotFoundException('testApp does not exists')
        return testApp;
      }

      async createOne(dto: CreateTestDto) {
        const newTest = this.testApp.create(dto)
        const field = await this.testApp.save(newTest)
        return field;
      }

      async editOne(id: number, dto: EditTestDTO) {
        const test = await this.getOne(id)   
        const editedTest = Object.assign(test, dto);
        return await this.testApp.save(editedTest);
      }
}
