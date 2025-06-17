import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Product } from './product.entity';



@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    try {
      return await this.productsService.getProductById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async createProduct(
    @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.deleteProduct(id);
  }

  @Delete(':id/soft')
  async softDeleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.softDeleteProduct(id);
  }
}