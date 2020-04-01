import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Review } from 'src/entity/review.entity';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';


@Injectable()
export class ReviewService {
    constructor (
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) {}

    async getReviewByTargetId(): Promise<Review[]> {
        return [{
            reviewId: 1, reviewerId: 1, targetId: 2,
            timeStamp: new Date(), description: "verygood"
        }, {
            reviewId: 2, reviewerId: 3, targetId: 2,
            timeStamp: new Date(), description: "very suck he's so horny"
        }];
        return ;
    }

    async createReview(review:CreateReviewDto ) {
        
    }

    getReviewById(): Review {
        return {
            reviewId: 10, reviewerId: 1, targetId: 2,
            timeStamp: new Date(), description: "verygood"
        };
        return ;
    }
}