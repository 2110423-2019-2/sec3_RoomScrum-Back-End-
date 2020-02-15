import { IsInt, Min } from "class-validator";

export class RejectUserDto {
    @IsInt()
    @Min(1)
    userId: number;
}