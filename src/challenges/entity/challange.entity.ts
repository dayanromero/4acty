import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestApp } from '../../test/entity/test.entity';
@Entity('challanges')
export class Challanges {
@PrimaryGeneratedColumn()
public id: number;
@Column({ type: 'text', nullable: false })
name!: string;
@Column({ type: 'varchar', length: 150,select: false})
title!: string;
@Column({ type: 'varchar', length: 200})
description!: string;
@Column({ type: 'text' })
url!: string;
@Column({ type: 'text' })
groupRaiting!: string;
@Column({ type: 'text' })
thumbnail!: string;
@ManyToOne(() => TestApp, test => test.id)
test: TestApp;
}