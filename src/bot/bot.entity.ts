import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Bot {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column({ type: 'varchar', length: 250, unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
