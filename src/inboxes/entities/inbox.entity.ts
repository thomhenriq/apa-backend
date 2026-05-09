import { Member } from 'src/members/entities/member.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('inboxes')
export class Inbox {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Member, (member) => member.inbox)
  @JoinColumn()
  member: Member;

  @OneToMany(() => Message, (message) => message.inbox)
  messages: Message[];
}
