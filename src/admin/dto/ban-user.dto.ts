import { IsInt, Min, IsString, IsNotEmpty } from "class-validator";

export class BanUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsInt()
    @Min(1)
    banDuration: number; // in days
}