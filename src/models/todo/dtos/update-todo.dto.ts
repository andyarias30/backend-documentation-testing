import { IsString, IsOptional, IsBoolean , IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly isDone?: boolean;
}
