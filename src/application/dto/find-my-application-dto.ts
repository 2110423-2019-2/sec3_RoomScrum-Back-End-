import { IsNotEmpty, IsNumber, IsEmpty, IsDateString, IsArray } from "class-validator";

class findMyApplicationDto {
    @IsNotEmpty()
    @IsArray()
    status: string[];
}

export default findMyApplicationDto;