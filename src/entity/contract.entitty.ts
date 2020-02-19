import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract{ 
    @PrimaryGeneratedColumn()
    contractId: number;

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
        length:5 
    })
    zipcode: string;

    @Column({
        type:'datetime'
    })
    startdatetime: string;

    @Column({
        type:'datetime'
    })
    enddatetime: string;

    // @Column({
    //     type:'set', 
    //     length:50 })
    // tag: string[];
}
