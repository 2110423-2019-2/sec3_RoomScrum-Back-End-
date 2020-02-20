import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany,Column } from 'typeorm';
import { User } from './user.entity';
import { Application } from './application.entity';
export enum HireeType {
    Musician = 'M', Band = 'B'
  }
@Entity()
export class Hiree {

    @PrimaryGeneratedColumn()
    hireeId: number;

    @Column({
        type: 'enum',
        enum: HireeType,
    })
    hireeType: HireeType;

    // @Column({
    //     type:'set', })
    // tag: string[];

    @OneToOne(type => User, user => user.hiree)
    user: User;

    // @OneToMany(type => Application, application => application.hiree.hireeId)
    // application: Application[];
}