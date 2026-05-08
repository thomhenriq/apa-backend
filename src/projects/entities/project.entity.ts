import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("projects")
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({
        unique: true
    })
    slug: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}