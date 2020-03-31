import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    reviewerId: number;

    @Column()
    targetId: number;

    @Column()
    timeStamp: Date;
    
    @Column()
    description: string;
}
