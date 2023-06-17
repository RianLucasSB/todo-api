import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsDefined()
  userId: string;
}
