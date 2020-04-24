import { IsNumber, IsNotEmpty, IsString, IsEnum, IsIn } from "class-validator";
import { NotificationType } from "src/entity/notification.entity";


export class CreateNotificationDto {

    @IsString()
    @IsNotEmpty()
    @IsEnum(NotificationType)
    type: string;

    @IsNumber()
    @IsNotEmpty()
    senderId: number;
    
    @IsNumber()
    @IsNotEmpty()
    receiverId: number;

    @IsNumber()
    @IsNotEmpty()
    eventId: number;
    
}