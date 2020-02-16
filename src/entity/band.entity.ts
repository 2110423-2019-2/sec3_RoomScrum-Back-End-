import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";


@Entity()
export class Band {

    @PrimaryGeneratedColumn()
    bandId: number;

    @Column({
      length: 150,
      nullable: true
    })
    bio: string;

    @Column({
      length: 255,
      nullable: true
    })
    bandImage: string;

}

