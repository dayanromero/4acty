import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, BaseEntity } from 'typeorm';
import { User } from 'src/user/entity';
import { Cycle } from 'src/cycles/entity';
@Entity('user-cycles')
export class UserCycles extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
    
    @ManyToOne(() => User, test => test.id)
    user: User;
    
    @ManyToOne(() => Cycle, fieldForm => fieldForm.id)
    cycle: Cycle;
    
    @Column({ type: 'bool', default: false })
    view: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}