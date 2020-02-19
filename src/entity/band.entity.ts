import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn , OneToMany } from "typeorm";
import { Join } from './join.entity';

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

    @OneToMany(type => Join, join => join.band.bandId)
    join: Join[];
}

