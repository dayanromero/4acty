
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModuleApp } from '../../modules/entity';


@Entity('test')
export class TestApp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @ManyToOne(() => ModuleApp, module => module.id)
    module: ModuleApp;
}