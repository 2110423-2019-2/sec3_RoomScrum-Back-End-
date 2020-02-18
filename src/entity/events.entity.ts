import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from './user.entity' ;

@Entity()
export class Event { 
    @PrimaryGeneratedColumn()
    eventId: number;

    @Column({length: 255})
    eventName: string;

    @Column({ length:2000 })
    description: string;

    @Column({ length:1000 })
    address: string;

    @Column({ length:255 })
    subdistrict: string;

    @Column({ length:255 })
    district: string;

    @Column({ length:255 })
    province: string;

    @Column({ length:255 })
    country: string;

    @Column({ 
        type:'char',
        length:5 })
    zipcode: string;

    @Column({
        type:'datetime'
    })
    startdatetime: Date;

    @Column({
        type:'datetime'
    })
    enddatetime: Date;

    // @Column({
    //     type:'set', })
    // tag: string[];

    @ManyToOne(type => User, user => user.event)
    user: User;
}
