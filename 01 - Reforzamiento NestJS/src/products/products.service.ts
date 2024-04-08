import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as Uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  /**----------------------------------------------
   ** CREATE PRODUCT FUNCTION
   *  @param {CreateProductDto} createProductDto 
   *  @returns {Product}
  -------------------------------------------------*/
  create(createProductDto: CreateProductDto): Product {

    const { name, description, price } = createProductDto;

    const newProduct = new Product(
      Uuidv4(),
      name,
      description,
      price,
    );

    this.products.push(newProduct);

    return newProduct;

  }

  /**------------------------------
   ** FIND ALL PRODUCTS FUNCTION
   *  @returns {Product[]}
  ---------------------------------*/
  findAll(): Product[] {
    return this.products;
  }

  /**-----------------------------
   ** FIND ONE PRODUCT FUNCTION
   *  @param {string} id
   *  @returns {Product}
  -------------------------------*/
  findOne(id: string): Product {

    const product = this.products.find(product => product.id === id);

    if(!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;

  }

  /**----------------------------------------------
   ** UPDATE PRODUCT FUNCTION
   *  @param {string} id 
   *  @param {UpdateProductDto} updateProductDto
   *  @returns {Product}
  -------------------------------------------------*/
  update(id: string, updateProductDto: UpdateProductDto): Product {
    const { id:__, name, description, price } = updateProductDto;
    const product = this.findOne(id);
    product.updateWith({ name, description, price });
    return product;
  }

  /**---------------------------
   ** REMOVE PRODUCT FUNCTION
   * @param {string} id
   * @returns {Product}
  ------------------------------*/
  remove(id: string): Product {
    
    const product = this.findOne(id);

    this.products = this.products.filter(product => product.id != id);

    return product;

  }
  
}
