import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inbox } from '../../inboxes/entities/inbox.entity';

export enum MemberRole {
  ASSES = 'assessorx',
  COORD = 'coordenadorx',
  DIREX = 'diretorx',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  role: string;

  @OneToOne(() => Inbox, (inbox) => inbox.member)
  inbox: Inbox;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.member)
  collabs: Collaborator[];
}
