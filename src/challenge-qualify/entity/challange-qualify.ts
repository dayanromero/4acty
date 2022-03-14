import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';
import { User } from 'src/user/entity';
import { Challanges } from 'src/challenges/entity/challange.entity';
import { TestApp } from 'src/test/entity';

@Entity('challange-qualify')
export class ChallangeQualify {
@PrimaryGeneratedColumn()
public id: number;

@Column({ type: 'integer' })
qualification: number;

@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;

@ManyToOne(() => Challanges, challange => challange.id)
challange: Challanges;

@ManyToOne(() => User, user => user.id)
user: User;

@ManyToOne(() => TestApp, test => test.id)
test: TestApp;

@Column({ type: 'integer',default: 0})
viewApp: number;

}