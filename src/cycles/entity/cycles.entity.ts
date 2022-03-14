import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entity';
import { Difficulty } from 'src/difficulty/entity';

@Entity('cycles')
export class Cycle {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'integer',default:null })
    parent: number;
    
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

    @Column({ type: 'text',default:null })
    body: string;

    @ManyToOne(() => Category, category => category.id)
    category: Category;

    @ManyToOne(() => Difficulty, difficulty => difficulty.id)
    difficulty: Difficulty;

}