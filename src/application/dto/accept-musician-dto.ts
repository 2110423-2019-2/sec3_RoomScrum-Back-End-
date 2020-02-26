import {
    IsString,
    IsNotEmpty,
    IsEnum,
    Length,
    MinLength,
    IsEmail,
    IsNumber,
    IsEmpty,
    IsDateString
  } from "class-validator";

  class acceptMusicianDto {
    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    @IsNotEmpty()
    @IsNumber()
    hireeId: number;
  }

  export default acceptMusicianDto;