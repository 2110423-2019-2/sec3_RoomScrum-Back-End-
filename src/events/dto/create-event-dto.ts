import { IsString, IsNotEmpty, Length, MinLength, IsEmail, IsNumber, IsEmpty, IsDateString } from "class-validator";

class createEventDto {

    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    subdistrict: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    province: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    zipcode: string;

    // TODO : tag: string[]

    @IsNotEmpty()
    @IsDateString()
    startdatetime: Date;

    @IsNotEmpty()
    @IsDateString()
    enddatetime: Date;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}

export default createEventDto;