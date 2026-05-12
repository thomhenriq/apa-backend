import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Member } from '../../members/entities/member.entity';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.collaborators)
  project: Project;

  @ManyToOne(() => Member, (member) => member.collabs)
  member: Member;

  @CreateDateColumn()
  createdAt: Date;
}
