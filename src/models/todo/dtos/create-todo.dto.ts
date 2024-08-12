import { IsString, IsOptional, IsBoolean , IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly isDone?: boolean;
}
