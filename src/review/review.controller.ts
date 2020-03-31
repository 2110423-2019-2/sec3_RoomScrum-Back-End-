import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Review } from 'src/entity/review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor (
        private readonly reviewService: ReviewService,
    ) {}
    

    @Get('of-user/:id')
    async getReviewByTargetId(@Req() req): Promise<Review[]> {
        return [{
            reviewId: 1, reviewerId: 1, targetId: 2,
            timeStamp: new Date(), description: "verygood"
        }, {
                reviewId: 2, reviewerId: 3, targetId: 2,
                timeStamp: new Date(), description: "very suck he's so horny"
            }];
    }

    @Get(':id')
    getReviewById(@Param('id') id): Review {
        return { reviewId:10, reviewerId:1, targetId:2, 
            timeStamp: new Date(), description:"verygood"};
    }

    @Post()
    createReview(){
        return 
    }
}