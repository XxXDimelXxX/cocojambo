import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3, { message: 'Название категории должно содержать минимум 3 символа' })
  name: string;
}