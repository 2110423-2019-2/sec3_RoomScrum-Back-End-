import { Entity, Column } from "typeorm";

@Entity()
export class Event { //TODO : Update Attributes
    @Column({ primary:true })
    event_id: number;

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

    @Column({ length:5 })
    zipcode: string;

    // @Column('simple-array') //tag array?
    // tag: string[];

    @Column()
    startdatetime: Date;

    @Column()
    enddatetime: Date;

    @Column()
    user_id: number;
}
