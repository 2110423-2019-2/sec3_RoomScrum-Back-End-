import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity"
import { Band } from "./band.entity"
export enum Status {
    default = 0, isInvited = 1, isApplied = 2, areAccepted = 3
}

@Entity()
export class Join { //This is a table for map event_id -> hiree_id
    @Column({primary:true})
    userId: number;

    @Column({primary:true})
    bandId: number;

    @Column({
        type: 'datetime'
    })
    timestamp: Date;

    @ManyToOne(type => User, user => user.join)
    @JoinColumn({
        name: "userId", // new name
        referencedColumnName: "userId", // field name in user
    })
    user: User;
    
    @ManyToOne(type => Band, Band => Band.join)
    @JoinColumn({
        name: "bandId", // new name
        referencedColumnName: "bandId", // field name in user
    })
    band: Band;

    
    
}