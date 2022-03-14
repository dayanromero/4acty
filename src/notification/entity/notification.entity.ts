import { User } from 'src/user/entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
@Entity('notifications')
export class Notification{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar',length:80 })
    name: string;

    @Column({ type: 'varchar',length:200,default:null })
    description: string;

    @Column({ type: 'smallint',default:0 })
    type: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp',select: false })
    createdAt: Date;

    @Column({ type: 'bool', default: false })
    view: boolean;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @ManyToOne(() => User, user => user.id)
    user: User;

}