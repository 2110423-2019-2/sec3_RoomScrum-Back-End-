import { IsNumber, IsNotEmpty, IsString, IsEnum, IsIn } from "class-validator";

// these are dto for event-related notifications


export class EventInviteDto {    
    @IsNumber()
    @IsNotEmpty()
    receiverId: number;
    
    @IsNumber()
    @IsNotEmpty()
    eventId: number;
}



export const eventUpdateTypes = ["UPDATE", "CANCEL", "ACCEPT", "REJECT"];
// notification for event update, cancel, accept, reject 
export class EventStateUpdateDto {
    
    @IsIn(eventUpdateTypes)
    @IsNotEmpty()
    updateType: string;

    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @IsNumber()
    @IsNotEmpty()
    receiverId: number;
}