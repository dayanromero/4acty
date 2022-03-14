import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TestApp } from '../../test/entity/test.entity';
import { FormGroupApp } from "src/form-group/entity/form-group.entity";

@Entity('form-test')
export class FormToTest {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => TestApp, test => test.id)
    test: TestApp;

    @ManyToOne(() => FormGroupApp, formGroups => formGroups.id)
    formGroup: FormGroupApp;
    
}