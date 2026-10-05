import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { GetProductQueryDto } from './dto/get-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId })
    if (!category) {
      let errors: string[] = []
      errors.push("La categoria no existe")
      throw new NotFoundException(errors)
    }
    // Copiamos las propiedades del DTO y le asignamos el objeto 'category' (ya que en la entidad la relación se llama 'category' y en el DTO viene solo 'categoryId')
    return this.productRepository.save({ ...createProductDto, category })

  }

  async findAll(categoryId: number | null, take: number, skip: number) {

    const options: FindManyOptions<Product> = {
      relations: {
        //*nos aseguramos que traiga la relacion con categoria
        category: true,
      },
      order: {
        id: "DESC"
      },
      //*take toma los primeros dos registros y  skip se salta los registros
      take: take,
      skip: skip
    }
    //*Filtracion de categoria atraves de query
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId
        }
        ,
      }
    }
    //*sin query recibe aqui todos los productos
    const [products, total] = await this.productRepository.findAndCount(options);
    return {
      products,
      total
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      //*para traer la relacion con categoria
      relations: { category: true }
    });
    console.log(product);

    if (!product) throw new NotFoundException("El producto no existe");
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...toUpdate,
    });

    if (!product) throw new NotFoundException(`El producto con id: ${id} no existe`);

    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (!category) throw new NotFoundException("La categoria no existe");
      product.category = category;
    }

    try {
      await this.productRepository.save(product);
      return this.findOne(id);
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: "El producto ha sido eliminado satisfactoriamente" };
  }

  handleDbException(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException("El producto ya existe");
    }
  }
}
