import {
  IsString,
  IsNotEmpty,
  Length,
  MinLength,
  IsEmail,
  IsNumber,
  IsEmpty,
  IsDateString
} from "class-validator";

class searchEventDto {
  // @IsNotEmpty()
  @IsString()
  searchType: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export default searchEventDto;
