import { Entity, Column, UpdateDateColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Message {
    @PrimaryColumn()
    @Generated('uuid')
    id: string;

    @Column()
    conversationId: string;

    @UpdateDateColumn()
    timestamp: Date;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    text: string;
}
