import { Entity, Column } from "typeorm";

@Entity({name: 'Event'})
export class Event {
    @Column({ primary:true })
    event_id: number;

    @Column({ length:2000 })
    description: string;

    @Column()
    startdatetime: Date;

    @Column()
    enddatetime: Date;

    @Column()
    user_id: number;
}