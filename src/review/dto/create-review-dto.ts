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

    @IsEmpty()
    reviewerId: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    eventId: number;
}


export default CreateReviewDto;
