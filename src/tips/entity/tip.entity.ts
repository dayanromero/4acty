import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entity';
import { Difficulty } from 'src/difficulty/entity';
import { ModuleApp } from 'src/modules/entity';

@Entity('tips')
export class Tip {
    @PrimaryGeneratedColumn()
    public id: number;

    
    @Column({ type: 'varchar',length:80 })
    name: string;
    
    @Column({ type: 'varchar',length:200,default:null })
    description: string;
    
    @Column({ type: 'varchar',length:250,default:null })
    url: string;

    @Column({ type: 'smallint',default:0 })
    type: string;
    
    @Column({ type: 'varchar',length:250,default:null })
    thumbnail: string;

    @Column({ type: 'text' })
    body: string;

    @ManyToOne(() => ModuleApp, module => module.id)
    module: ModuleApp;

}