import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from './user.entity';
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import { Application } from './application.entity';
import { OneToMany } from "typeorm";

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

    /////////////////////////////Event image
    @Column({
        nullable: true
    })
    eventImage: string;

    // @Column({
    //     type:'set', })
    // tag: string[];

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.event, {
        // eager: true,
    })
    @JoinColumn({
        name: "userId", // new name
        referencedColumnName: "userId", // field name in user
    })
    user: User;

    @OneToMany(type => Application, application => application.event.eventId)
    application: Application[];
}
