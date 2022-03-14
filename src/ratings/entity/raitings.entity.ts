import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('raitings')
export class Raiting {
@PrimaryGeneratedColumn()
public id: number;
@Column({ type: 'varchar', length: 80 })
value!: string;
@Column({ type: 'integer' })
points!: string;
@Column({ type: 'varchar',length:80 })
group_qualifies_id!: string;

}