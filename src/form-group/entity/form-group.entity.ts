import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TestApp } from '../../test/entity/test.entity';
import { FieldForm } from '../../fields-forms/entity';
@Entity('form-groups')
export class FormGroupApp {
@PrimaryGeneratedColumn()
public id: number;

@Column({ type: 'text', nullable: false })
title: string;


@Column({ type: 'bool', default: true })
status: boolean;

@Column({ type: 'numeric',default: 0 })
viewApp: number;

@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;


@OneToMany(() => FieldForm, fieldForm => fieldForm.formGroup)
fieldForm: FieldForm;
}