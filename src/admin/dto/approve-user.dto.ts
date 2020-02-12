import { IsInt, Min } from "class-validator";

export class ApproveUserDto {
    @IsInt()
    @Min(1)
    id: number;
}