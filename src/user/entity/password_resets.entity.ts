import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('password_resets')
export class PasswordResets{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({default:''})
    token:string;

    @Column({nullable: false})
    code:number;
    
    @Column({default:''})
    refreshtokenexpires:string;
    
    
    @Column({default:0})
    status:number;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp',select: false })
    createdAt: Date;

}