import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from 'src/entity/review.entity';

@Module({
    providers: [ReviewService],
    imports: [
        TypeOrmModule.forFeature([Review])
    ],
    controllers: [ReviewController]
})
export class ReviewModule {}