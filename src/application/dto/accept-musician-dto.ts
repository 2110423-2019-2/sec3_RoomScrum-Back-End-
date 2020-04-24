import { IsNotEmpty, IsNumber } from "class-validator";

class acceptMusicianDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  hireeId: number;
}

export default acceptMusicianDto;
