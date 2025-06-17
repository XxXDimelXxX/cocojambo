import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto} from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ where: {deletedAt: IsNull() } });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id, deletedAt: IsNull() });
    if (!product) {
      throw new Error(`Товар с ID ${id} не найден`);
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.getProductById(id);
    await this.productsRepository.remove(product);
  }

  async softDeleteProduct(id: number): Promise<void> {
    const product = await this.getProductById(id);
    await this.productsRepository.softRemove(product);
  }
}