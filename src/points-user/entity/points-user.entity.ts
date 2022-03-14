import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TestApp } from '../../test/entity/test.entity';
import { FieldForm } from '../../fields-forms/entity';
import { User } from 'src/user/entity';
@Entity('points-user')
export class PointsUser {
@PrimaryGeneratedColumn()
public id: number;

@Column({ type: 'integer' })
qualification: number;

@ManyToOne(() => TestApp, test => test.id)
test: TestApp;

@ManyToOne(() => User, user => user.id)
user: User;

@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;

}