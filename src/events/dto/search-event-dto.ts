import { IsString, IsNotEmpty } from "class-validator";

class searchEventDto {
  // @IsNotEmpty()
  @IsString()
  searchType: string;

  // @IsNotEmpty()
  @IsString()
  value: string;
}

export default searchEventDto;
