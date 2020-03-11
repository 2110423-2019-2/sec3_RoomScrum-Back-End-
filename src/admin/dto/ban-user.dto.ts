import { IsInt, Min, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;


    @IsInt()
    @Min(1)
    banDuration: number; // in days
}