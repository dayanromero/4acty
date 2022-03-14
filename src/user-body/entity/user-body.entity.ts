import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from 'src/user/entity';

@Entity('users-body')
export class UserBodyEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    
    //Biceps user
    @Column({ type: 'varchar', nullable: true, length: 10})
    biceps: string;
    
    //Antebrazo user
    @Column({ type: 'varchar', nullable: true, length: 10 })
    forearm: string;
    
    //muslo user
    @Column({ type: 'varchar',nullable: true, length: 10 })
    thigh: string;
    
    //pantorrila user
    @Column({ type: 'varchar',nullable: true, length: 10 })
    calf: string;
    
    
    @ManyToOne(() => User, user => user.id)
    user: User;

}