import {
    IsOptional,
    IsString,
    IsNotEmpty,
    Length,
    MinLength,
    IsEmail,
    IsISO8601,
    IsEmpty,
    IsNumberString,
    IsEnum,
    ValidateIf,
    IsNumber
} from "class-validator";

//TODO change to edit
export class UpdateContractDto {
    @IsOptional() //as post parameter instead
    @IsNumber()
    eventId: number;
    
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    price: number;
    
    @IsEmpty()
    status;


}