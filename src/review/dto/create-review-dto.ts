import {
    IsString,
    IsNotEmpty,
    IsEmpty,
    IsNumber,
} from "class-validator";
import { Gender, UserType, MusicianApprovement } from "src/entity/user.entity";

export class CreateReviewDto {

    @IsEmpty()
    reviewId: number;

    @IsNumber()
    reviewerId: number;

    @IsNumber()
    targetId: number;

    @IsEmpty()
    timeStamp: Date;

    @IsNotEmpty()
    @IsString()
    description: string;
}


export default updateUserDto;
