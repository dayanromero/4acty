import { Entity,  PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parameters')
export class Parameter {


@PrimaryGeneratedColumn()
public id: number;

@Column({type:'integer',default: 0})
id_parameter: number;

@Column({type:'integer',default: 0})
value: number;


@Column({ type: 'varchar', length: 255, default:'' })
name: string;

@Column({ type: 'bool', default: true })
status: boolean;

}