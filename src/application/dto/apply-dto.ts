import { IsString, IsNotEmpty, Length, MinLength, IsEmail, IsNumber, IsEmpty, IsDateString } from "class-validator";

class applyDto {

    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    @IsNotEmpty()
    @IsNumber()
    hiree_id: number;
}

export default applyDto;