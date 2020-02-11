import { Entity, Column } from "typeorm";

@Entity()
export class Event { //Change Attributes
    @Column({ primary:true })
    event_id: number;

    // @Column({ length:2000 })
    // description: string;

    @Column()
    startdatetime: Date;

    @Column()
    enddatetime: Date;

    @Column()
    user_id: number;
}