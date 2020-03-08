import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, EventInviteInfo, BandInviteInfo } from 'src/entity/notification.entity';

@Module({
  providers: [NotificationService],
  imports: [
    TypeOrmModule.forFeature([Notification, EventInviteInfo, BandInviteInfo])
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
