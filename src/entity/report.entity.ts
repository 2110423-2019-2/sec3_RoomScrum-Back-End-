import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";


export enum ReportStatus {
    UNREAD = "UNREAD", // review pending by admin
    READ = "READ"
}

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    reportId: number;

    @Column({type: "datetime"})
    timestamp: Date;

    @Column({type: "varchar", length: "255"})
    topic: string;

    @Column({type: "varchar", length: "2000"})
    description: string;

    @Column()
    reportBy: string;
    
    @ManyToOne(type => User)
    @JoinColumn({
        name: "reportBy",
        referencedColumnName: "username",
    })
    reporter: User;

    @Column({
        type: "enum",
        enum: ReportStatus,
        default: ReportStatus.UNREAD,
    })
    status: string;


    // person who is reported
    @Column()
    reportTo: string;
    
    @ManyToOne(type => User)
    @JoinColumn({
        name: "reportTo",
        referencedColumnName: "username",
    })
    offender: User;
}