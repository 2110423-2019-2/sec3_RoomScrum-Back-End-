import { IsString, IsNotEmpty } from "class-validator";

class findUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export default findUserDto;
