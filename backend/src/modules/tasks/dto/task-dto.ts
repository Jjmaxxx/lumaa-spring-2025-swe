import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isComplete?: boolean = false;
}