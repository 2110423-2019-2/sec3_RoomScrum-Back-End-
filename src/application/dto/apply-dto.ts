import { IsNotEmpty, IsNumber, IsEmpty, IsDateString } from "class-validator";
import { Status } from "src/entity/application.entity";
class applyDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  // @IsNotEmpty()
  // @IsNumber()
  @IsEmpty()
  hireeId: number;

  @IsEmpty()
  timestamp: Date;

  // @IsNotEmpty()
  // @IsEnum(Status)
  @IsEmpty()
  status: Status;
}

export default applyDto;
