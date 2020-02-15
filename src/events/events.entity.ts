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

// @Entity()
// export class Application { //This is a table for map event_id -> hiree_id
//     @Column({primary:true})
//     event_id: number;

//     @Column({primary:true})
//     hiree_id: number;
// }
