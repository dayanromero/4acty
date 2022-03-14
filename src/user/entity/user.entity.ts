import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
} from 'typeorm';
import { hash,compare } from 'bcryptjs';
/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}



  @Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default:'usuario' })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, default:'' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;
  
  @Column({type:'varchar',default:true})
  roles: string[];

  @Column({ type: 'bool', default: true })
  status: boolean;

  @Column({ type: 'bool', default: true })
  premium: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  height: number;

  @Column({ type: 'numeric',default: 0,transformer: new ColumnNumericTransformer(), })
  mobile: number;

  @Column({ type: 'varchar',default: 0 })
  indicative: number;

  @Column({type:'integer',default: 0})
  age: number;

  @Column({type:'varchar',default: ''})
  gender: string[];

  @Column({type:'varchar',default: '',length: 255})
  image_profile: string;

  @Column({default:''})
    refreshtoken:string;
 
  @Column({default:''})
  refreshtokenexpires:string;

  @Column({default:0})
  antecendent:number;

  @Column({default:0})
  habit:number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp',select: false })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }
}


