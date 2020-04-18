import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification, NotificationType} from 'src/entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    constructor (
        @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
    ) {}


    async debugGetAllNotifications(): Promise<Notification[]> {
        return this.notificationRepo.find()
    }

    async getUserNotification(userId: number): Promise<Notification[]> {
        return this.notificationRepo.find({receiverId: userId});
    }

    // create new notification
    async createNotification(notificationDetail: CreateNotificationDto) {
        console.log(notificationDetail);
        return this.notificationRepo.insert({
            ...notificationDetail,
            timestamp: new Date(),
        })
    }
}
