import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";



@Entity()
export class Report { //This is a table for map event_id -> hiree_id
    @PrimaryGeneratedColumn()
    reportId: number;

    @Column({})
    username:string;

    @Column({length:2000})
    description:string;

}