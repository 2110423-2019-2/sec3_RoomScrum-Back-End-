import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Review } from 'src/entity/review.entity';
import { ReviewService } from './review.service';
import { UserService } from 'src/user/user.service';

@Controller('review')
export class ReviewController {
    constructor (
        private readonly reviewService: ReviewService,
    ) {}
    

    @Get('of-user/:id')
    async getReviewByTargetId(@Req() req): Promise<Review[]> {
        
        return this.reviewService.getReviewByTargetId();
    }

    @Get(':id')
    getReviewById(@Param('id') id): Review {
        return this.reviewService.getReviewById();
    }

    @Post()
    createReview(){
        return 
    }
}