import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";


export enum ReportStatus {
    PENDING = "PENDING", // review pending by admin
    ACTION_TAKEN = "ACTION_TAKEN", // offender is banned
    REJECTED = "REJECTED", // offender is innocent
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
        default: ReportStatus.PENDING,
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