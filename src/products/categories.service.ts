import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ where: { deletedAt: IsNull() } });
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['products'], // Загружаем связанные товары
    });
    if (!category) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`);
    }
    return category;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    await this.categoriesRepository.remove(category);
  }

  async softDeleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    await this.categoriesRepository.softRemove(category);
  }
}