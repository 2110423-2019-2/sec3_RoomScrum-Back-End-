import { IsNumber, IsNotEmpty } from "class-validator";

// these are dto for event-related notifications


export class EventInviteDto {    
    @IsNumber()
    @IsNotEmpty()
    receiverId: number;
    
    @IsNumber()
    @IsNotEmpty()
    eventId: number;
}