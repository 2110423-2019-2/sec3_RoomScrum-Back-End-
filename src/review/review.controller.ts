import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { Review } from 'src/entity/review.entity';

@Controller('review')
export class ReviewController {
    constructor (
        
    ) {}

    @Get(':id')
    getReviewById(@Param('id') id): Review {
        return new Review
    }

    @Post()
    createReview(){
        return 
    }
}