import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from 'src/entity/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [NotificationService],
  imports: [
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
