import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column, BaseEntity } from 'typeorm';
import { User } from 'src/user/entity';
import { Category } from 'src/category/entity';
import { ModuleApp } from 'src/modules/entity';
@Entity('user-categorys')
export class UserCategory extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    
    @ManyToOne(() => User, test => test.id)
    user: User;
    
    @ManyToOne(() => Category, fieldForm => fieldForm.id)
    category: Category;
    
    @Column({ type: 'smallint', default: 0 })
    status: number;

    @ManyToOne(() => ModuleApp, module => module.id)
    module: ModuleApp;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}