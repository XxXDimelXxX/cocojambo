import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(3, { message: 'Название категории должно содержать минимум 3 символа' })
  @IsOptional()
  name?: string;
}