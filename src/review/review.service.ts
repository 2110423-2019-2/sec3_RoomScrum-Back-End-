import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, createQueryBuilder } from 'typeorm';
import { Review } from 'src/entity/review.entity';
import { Event } from 'src/entity/events.entity';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { User } from 'src/entity/user.entity';


@Injectable()
export class ReviewService {
    constructor (
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}

    async getReviewByTargetId(targetId): Promise<Review[]> {
        // const review:Review = await this.reviewRepository
        //     .createQueryBuilder('review')
        //     .where('review.reviewId = :id', { id: targetId })
        //     .getMany();
        return this.reviewRepository.find({targetId:targetId});
    }


    async createReview(reviewer: Partial<User>, reviewDto:CreateReviewDto ) {
        const reviewerId = reviewer.userId;
        const reviewerType = reviewer.userType;
        //TODO determine review
        // if (reviewerType == )

        // const isMusician = (reviewerId == )

        const event: Event = await createQueryBuilder()
            .select('event.userId')
            .from(Event,'event')
            .where('event.eventId = :id', {id:reviewDto.eventId})
            .getOne()

        const review = {
            reviewerId: reviewerId,
            targetId: reviewerId,
            description: reviewDto.description,
            timeStamp: Date(),
            
        }

        return this.reviewRepository
            .createQueryBuilder()
            .insert()
            .into(Review)
            .values(review)
            .execute();
    }

    async getReviewById(reviewId: number): Promise<Review> {
        return await this.reviewRepository
            .createQueryBuilder('review')
            .where('review.reviewId = :id', {id: reviewId})
            .getOne();
    }
}