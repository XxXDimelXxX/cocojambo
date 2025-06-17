import { IsString, IsNumber, MinLength, IsPositive, IsOptional, IsInt } from 'class-validator';


export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Product name is required' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive({message: 'Product id is required' })
  quantity: number;

  @IsNumber()
  @IsPositive({message: 'Product id is required' })
  price: number;

}