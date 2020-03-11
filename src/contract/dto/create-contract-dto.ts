import { IsNotEmpty, IsNumber, IsEmpty, IsString } from "class-validator";

class CreateContractDto {
    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsEmpty()
    status: string;

    @IsEmpty()
    hireeId: number;
}

export default CreateContractDto;