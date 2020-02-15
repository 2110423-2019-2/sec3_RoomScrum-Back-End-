import { Entity, Column } from "typeorm";

@Entity()
export class Application { //This is a table for map event_id -> hiree_id
    @Column({primary:true})
    event_id: number;

    @Column({primary:true})
    hiree_id: number;
}

