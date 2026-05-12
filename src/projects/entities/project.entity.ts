import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.project)
  collaborators: Collaborator[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
