import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected.');
  }

  /**----------------------------------------------
   ** CREATE PRODUCTS FUNCTION
   *  @param {CreateProductDto} createProductDto 
   *  @returns product
  -------------------------------------------------*/
  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    });

  }

  /**-------------------------------
   ** FIND ALL PRODUCTS FUNCTION 
   * @param {PaginationDto} page 
   * @param {PaginationDto} limit
   * @returns products
  ----------------------------------*/
  async findAll({ page, limit }: PaginationDto) {

    const totalPages = await this.product.count({ where: { available: true } });

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true }
      }),
      meta: {
        page: page,
        lastPage: lastPage,
        total: totalPages,
      }
    }

  }

  /**-----------------------------
   ** FIND ONE PRODUCT FUNCTION
   *  @param {number} id
   *  @returns product
  --------------------------------*/
  async findOne(id: number) {

    const product = await this.product.findFirst({
      where: { id, available: true }
    });

    if(!product){
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;

  }

  /**---------------------------
   ** UPDATE PRODUCT FUNCTION
   *  @param id 
   *  @param updateProductDto 
   *  @returns product
  ------------------------------*/
  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: data,
    });

  }

  async remove(id: number) {

    await this.findOne(id);

    //! HARD DELETE //
    // return this.product.delete({
    //   where: { id }
    // });

    //* SOFT DELETE //
    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      }
    });

    return product;

  }

}
