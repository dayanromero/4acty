import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TestApp } from '../../test/entity/test.entity';
import { FieldForm } from '../../fields-forms/entity';
@Entity('difficultys')
export class Difficulty {

@PrimaryGeneratedColumn()
public id: number;

@Column({ type: 'varchar', length:80 })
name: string;

@Column({ type: 'varchar', length:10 })
values: string;

@ManyToOne(() => TestApp, test => test.id)
test: TestApp;

}
