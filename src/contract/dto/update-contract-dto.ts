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

export class UpdateContractDto {
    @IsOptional()
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