import { IsString, IsNotEmpty, IsEnum, Length, MinLength, IsEmail, IsNumber, IsEmpty, IsDateString } from "class-validator";
import { Status } from 'src/entity/application.entity';

class applyDto {

    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    @IsNotEmpty()
    @IsNumber()
    hireeId: number;

    @IsNotEmpty()
    @IsDateString()
    timestamp: Date;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;
}

export default applyDto;