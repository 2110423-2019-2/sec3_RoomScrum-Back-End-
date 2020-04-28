import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from 'src/entity/review.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    providers: [ReviewService],
    imports: [
        TypeOrmModule.forFeature([Review]),
        NotificationModule
    ],
    controllers: [ReviewController]
})

export class ReviewModule {}