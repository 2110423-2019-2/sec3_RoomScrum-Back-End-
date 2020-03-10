import { IsString, IsNotEmpty } from "class-validator";

class searchUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export default searchUserDto;
