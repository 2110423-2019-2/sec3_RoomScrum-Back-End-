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
    id: number;

    @Column({type: "datetime"})
    timestamp: Date;

    @Column({type: "varchar", length: "1023"})
    message: string;

    @Column()
    reporterId: number;
    
    @ManyToOne(type => User)
    @JoinColumn({
        name: "reporterId",
        referencedColumnName: "userId",
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
    offenderId: number;
    
    @ManyToOne(type => User)
    @JoinColumn({
        name: "offenderId",
        referencedColumnName: "userId",
    })
    offender: User;
}