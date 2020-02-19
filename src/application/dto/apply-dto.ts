import { IsString, IsNotEmpty, IsEnum, Length, MinLength, IsEmail, IsNumber, IsEmpty, IsDateString } from "class-validator";
import { Status } from 'src/entity/application.entity';
import { Hiree } from "src/entity/hiree.entity";
import { Event } from 'src/entity/events.entity';
class applyDto {

    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    // @IsNotEmpty()
    // @IsNumber()
    @IsEmpty()
    hireeId: number;

    @IsNotEmpty()
    @IsDateString()
    timestamp: Date;

    // @IsNotEmpty()
    // @IsEnum(Status)
    @IsEmpty()
    status: Status;


}

export default applyDto;