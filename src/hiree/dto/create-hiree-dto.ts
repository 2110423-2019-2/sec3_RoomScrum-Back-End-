import { IsEmpty, IsNumber, IsNotEmpty } from 'class-validator';

class createHireeDto {
    @IsEmpty()
    hireeId: number;
}

export default createHireeDto;