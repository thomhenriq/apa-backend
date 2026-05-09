import { Member } from 'src/members/entities/member.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inboxes')
export class Inbox {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Member, (member) => member.inbox)
  @JoinColumn()
  member: Member;
}
