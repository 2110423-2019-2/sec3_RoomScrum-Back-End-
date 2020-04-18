// for testing only

import { IsEnum, IsString, IsNumber } from "class-validator";


export class EventUpdateDto {
    
    @IsString()
    @IsEnum(["COMPLETE", "CANCEL", "ACCEPT", "REJECT"])
    updateType: string;

    @IsNumber()
    eventId: number;

    @IsNumber()
    receiverId: number;
}