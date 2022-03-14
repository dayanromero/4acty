import { FormGroupApp } from "src/form-group/entity/form-group.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('field-forms')
export class FieldForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    input: string;

    @Column({ type: 'varchar', length: 255 })
    label: string;

    @Column({ type: 'bool', default: true })
    status: boolean;

    @Column('simple-json')
    options:  [{ value: any,label:string }];

    @ManyToOne(() => FormGroupApp, formGroup => formGroup.fieldForm)
    formGroup: FormGroupApp;
    
}