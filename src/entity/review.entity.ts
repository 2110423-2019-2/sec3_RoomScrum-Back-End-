import { Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn } from "typeorm";
import { User } from 'src/entity/user.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    reviewerId: number;

    @ManyToOne(
        type => User, 
        reviewer => reviewer.myReviews, 
        {
            eager: true,
            nullable: false
        })
    @JoinColumn({
        name: "reviewerId",
        referencedColumnName: "userId"
    })
    reviewer: User;

    @Column()
    targetId: number;

    @ManyToOne(
        type => User, 
        target => target.aboutMeReviews,
        {
            eager: true,
            nullable: false
        })
    @JoinColumn({
        name: "targetId",
        referencedColumnName: "userId"
    })
    target: User;

    @Column()
    timeStamp: Date;
    
    @Column()
    description: string;
}
