import { IsString, IsNotEmpty, Length, MinLength, IsEmail, IsNumber, IsEmpty, IsDateString } from "class-validator";
import {User} from '../../entity/user.entity'
class createEventDto {

    @IsNotEmpty()
    @IsNumber()
    eventId: number;

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

    @IsNotEmpty()
    @IsString()
    tag: string[]

    @IsNotEmpty()
    @IsDateString()
    startdatetime: Date;

    @IsNotEmpty()
    @IsDateString()
    enddatetime: Date;

    @IsEmpty()
    @IsNumber()
    user: Number;
}

export default createEventDto;