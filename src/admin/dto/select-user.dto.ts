import { IsInt, Min } from "class-validator";

// general dto for api which choose user
export class SelectUserDto {
  @IsInt()
  @Min(1)
  userId: number;
}
