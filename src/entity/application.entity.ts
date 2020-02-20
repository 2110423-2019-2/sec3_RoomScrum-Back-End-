import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Hiree } from "./hiree.entity"
import { Event } from "./events.entity"
export enum Status {
    default = 0, isInvited = 1, isApplied = 2, areAccepted = 3
}

@Entity()
export class Application { //This is a table for map event_id -> hiree_id
    @Column({primary:true})
    eventId: number;

    @Column({primary:true})
    hireeId: number;

    @Column({
        type: 'datetime'
    })
    timestamp: Date;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.default
    })
    status: Status;

    @ManyToOne(type => Event, event => event.application)
    @JoinColumn({
        name: "eventId", // new name
        referencedColumnName: "eventId", // field name in user
    })
    event: Event;
    
    // @ManyToOne(type => Hiree, hiree => hiree.application, )
    // @JoinColumn({
    //     name: "hireeId", // new name
    //     referencedColumnName: "hireeId", // field name in user
    // })
    // hiree: Hiree;

    
    
}