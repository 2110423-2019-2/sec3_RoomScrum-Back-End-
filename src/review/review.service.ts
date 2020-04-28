import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, createQueryBuilder, QueryBuilder } from 'typeorm';
import { Review } from 'src/entity/review.entity';
import { Event } from 'src/entity/events.entity';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { User, UserType } from 'src/entity/user.entity';
import { Contract } from 'src/entity/contract.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/entity/notification.entity';


@Injectable()
export class ReviewService {
    constructor (
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly notificationService: NotificationService
    ) {}

    async getReviewByTargetId(targetId): Promise<Review[]> {

        return this.reviewRepository.find({targetId: targetId});

    }

    async createReview(reviewer: Partial<User>, reviewDto:CreateReviewDto ) {
        const reviewerId = reviewer.userId;
        const reviewerType = reviewer.userType;
        //TODO determine review
        if (reviewerType == UserType.Admin)
            throw "Admin can't write a review";
            
        const event: Event = await createQueryBuilder()
            .select(['event.userId', 'event.isMusicianReview', 'event.isHirerReview'])
            .from(Event, 'event')
            .where('event.eventId = :id', { id: reviewDto.eventId })
            .getOne()


        const isHirer = (reviewerType == UserType.Hirer)

        let targetId;

        if (isHirer) {

            if (event.isHirerReview)
                throw "Hirer of this event have already reviewed";

            createQueryBuilder()
                .update(Event)
                .set({isHirerReview : true})
                .where("eventId = :id", { id: reviewDto.eventId })
                .execute()
                
            const contract: Contract = await createQueryBuilder()
                .select('contract.hireeId')
                .from(Contract, 'contract')
                .where('contract.eventId = :id', { id: reviewDto.eventId })
                .getOne()

            targetId = contract.hireeId;

        } else {

            console.log(event.isHirerReview)
            if (event.isMusicianReview)
                throw "Musician of this event have already reviewed";

            createQueryBuilder()
                .update(Event)
                .set({ isMusicianReview: true })
                .where("eventId = :id", { id: reviewDto.eventId })
                .execute()

            targetId = event.userId;
        }


        const review = {
            reviewerId: reviewerId,
            targetId: targetId,
            description: reviewDto.description,
            timeStamp: Date(),
            
        }

        await this.notificationService.createNotification({
            type: NotificationType.NewReview,
            senderId: reviewer.userId,
            receiverId: targetId,
            eventId: reviewDto.eventId
        })

        return this.reviewRepository
            .createQueryBuilder()
            .insert()
            .into(Review)
            .values(review)
            .execute();; 
    }

    async getReviewById(reviewId: number): Promise<Review> {
        return await this.reviewRepository
            .createQueryBuilder('review')
            .where('review.reviewId = :id', {id: reviewId})
            .getOne();
    }
}