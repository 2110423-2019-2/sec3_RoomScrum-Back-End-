import { Controller, Body, Post, Req, Get, Param, Catch, HttpException, HttpStatus, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Review } from 'src/entity/review.entity';
import { ReviewService } from './review.service';
import { UserService } from 'src/user/user.service';
import { CreateReviewDto } from './dto/create-review-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
    constructor (
        private readonly reviewService: ReviewService,
    ) {}
    

    @Get('of-user/:id')
    async getReviewByTargetId(@Param('id') targetId): Promise<Review[]> {
        try {
            return this.reviewService.getReviewByTargetId(targetId);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/:id')
    async getReviewById(@Param('id') id): Promise<Review> {
        try {
            return await this.reviewService.getReviewById(id);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post()
    async createReview(@Body() createReview: CreateReviewDto, @Req() req): Promise<any> {
        const reviewerId = req.user.userId;
        try {
            await this.reviewService.createReview(reviewerId, createReview);
            return {
                status: 200,
                message: "OK"
            };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}