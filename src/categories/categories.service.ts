import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto)
    try {
      await this.categoryRepository.save(category)
      return category
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw new NotFoundException("La categoria no existe")
    return category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }


  private handleDBExceptions(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException("La categoria ya existe")
    }
  }
}
