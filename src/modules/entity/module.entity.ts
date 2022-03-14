
import { User } from 'src/user/entity';
import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    Entity,
    ManyToOne
  } from 'typeorm';

  @Entity('modules')
  export class ModuleApp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column('bool',{ default: 1 })
    status: boolean = true;

    @Column({ type: 'varchar', length: 15 })
    backgroundColor: boolean = true;

    @Column({ type: 'varchar', length: 20 })
    icon: boolean = true;

    @Column({ type: 'varchar', length: 10 })
    type: boolean = true;

    @Column({ type: 'text' })
    screen1: string;

    @Column({ type: 'text' })
    screen2: string;


    @Column({type:'text'})
    url_image: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

  }