import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';
import { Category } from './category.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    try {
      return await this.categoriesService.getCategoryById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async createCategory(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoriesService.deleteCategory(id);
  }

  @Delete(':id/soft')
  async softDeleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoriesService.softDeleteCategory(id);
  }
}