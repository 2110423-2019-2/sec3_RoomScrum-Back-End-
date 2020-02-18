import { Entity, Column } from "typeorm";

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
}

