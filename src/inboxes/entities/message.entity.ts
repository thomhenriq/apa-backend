import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inbox } from './inbox.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column({ default: false })
    read: boolean;

    @ManyToOne(() => Inbox, (inbox) => inbox.messages, { onDelete: 'CASCADE' })
    inbox: Inbox;

    @CreateDateColumn()
    createdAt: Date;
}
