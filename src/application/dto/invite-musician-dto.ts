import { IsNotEmpty, IsNumber, IsEmpty, IsDateString } from "class-validator";
import { ApplicationStatus } from "src/entity/application.entity";
class applyDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  hireeId: number;

  @IsEmpty()
  timestamp: Date;

  // @IsNotEmpty()
  // @IsEnum(Status)
  @IsEmpty()
  status: ApplicationStatus;
}

export default applyDto;
