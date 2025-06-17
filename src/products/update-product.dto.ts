import { IsString, IsNumber, MinLength, IsPositive, IsOptional, IsInt } from 'class-validator';


export class UpdateProductDto {
  @IsString()
  @MinLength(3, { message: 'Product name is required' })
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive({ message: 'Product id is required' })
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsPositive({ message: 'Product id is required' })
  @IsOptional()
  price?: number;
}



