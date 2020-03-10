import { IsInt, Min } from "class-validator";

export class BanUserDto {
    @IsInt()
    @Min(1)
    userId: number;

    @IsInt()
    @Min(1)
    banDuration: number; // in days
}