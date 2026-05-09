import { Project } from "src/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TaskPriority {
    HIGH = "high",
    NORMAL = "normal",
    LOW = "low"
}

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    priority: string

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project

    @CreateDateColumn()
    createdAt: Date
}