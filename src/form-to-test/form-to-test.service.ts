import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormToTestDTO, EditFormToTestDTO } from './dto';
import { FormToTest } from './entity';
import { TestApp } from 'src/test/entity';
import { FieldForm } from 'src/fields-forms/entity';

@Injectable()
export class FormToTestService {

  constructor(
    @InjectRepository(FormToTest)
    private readonly formToTest: Repository<FormToTest>
  ) { }

  async getMany(id: TestApp, view: string) {
    // return await this.formToTest.find({
    //   relations: ["test", "formGroup"],
    //   where: [{ test: id }]
    // })

    // const foo = await this.formToTest.createQueryBuilder('foo')
    // .select(['ft.id','fr.id','fr.label','fr.input'])
    // .from(FormToTest, 'ft')
    // .innerJoin('ft.form', 'fr')
    // .innerJoin('ft.test', 'ts')
    // .where('ft.test.id = ts.id')
    // .where({ test: id })
    // .getMany();

    // return foo;

    const foo = await this.formToTest.createQueryBuilder('foo')
    .where({ test: id })
    .select(['foo.id','ts.title','frg.id','frg.title','frg.status','ff.input','ff.label','ff.options'])
    .leftJoin('foo.formGroup', 'frg')
    .leftJoin('foo.test', 'ts')
    .leftJoin('frg.fieldForm', 'ff')
    .andWhere('ff.formGroup = frg.id')
    .andWhere(`frg.viewApp = ${view}`)
    // .take(10)
    .getMany();
    // .getRawMany()
    // .getSql();
    

    return foo;


  }

  async getOne(id: number) {
    const formToTest = await this.formToTest.findOne(id);
    if (!formToTest) throw new NotFoundException('formToTest does not exists')
    return formToTest;
  }

  async createOne(dto: CreateFormToTestDTO) {
    const newformToTest = this.formToTest.create(dto)
    const formTest = await this.formToTest.save(newformToTest)
    return formTest;
  }

  async editOne(id: number, dto: EditFormToTestDTO) {
    const formToTest = await this.getOne(id)
    const editedformToTest = Object.assign(formToTest, dto);
    return await this.formToTest.save(editedformToTest);
  }

}
