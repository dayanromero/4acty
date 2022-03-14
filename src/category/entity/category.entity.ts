import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ModuleApp } from 'src/modules/entity';
import { Difficulty } from 'src/difficulty/entity';
@Entity('categorys')
export class Category {

@PrimaryGeneratedColumn()
public id: number;

@Column({ type: 'integer' })
parent: number;

@Column({ type: 'varchar',length:80 })
name: string;

@Column({ type: 'varchar',length:200 })
description: string;

@Column({ type: 'varchar',length:150,default:null })
url: string;

@Column({ type: 'varchar',length:100 })
thumbnail: string;



@ManyToOne(() => ModuleApp, module => module.id)
module: ModuleApp;

@ManyToOne(() => Difficulty, difficulty => difficulty.id)
difficulty: Difficulty;

}