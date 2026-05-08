import { Inbox } from "../../inboxes/entities/inbox.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum MemberRole {
    ASSES = "assessorx",
    COORD = "coordenadorx",
    DIREX = "diretorx"
}

@Entity("members")
export class Member {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string
    
    @Column()
    role: string

    @OneToOne(() => Inbox, (inbox) => inbox.member)
    inbox: Inbox
}