import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Hiree {

    @PrimaryGeneratedColumn()
    hireeId: number;

    @OneToOne(type => User, user => user.hiree.hireeId)
    user: User;
}