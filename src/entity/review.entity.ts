import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    userId: number;

    @Column()
    hireeId: number;

    @Column()
    timeStamp: Date;

    @Column()
    score: Date;
    
    @Column()
    description: string;
}
