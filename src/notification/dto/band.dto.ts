import { IsNumber, IsNotEmpty } from "class-validator";


export class BandInviteDto {

    @IsNumber()
    @IsNotEmpty()
    receiverId: number;

    // todo bandID ?
}