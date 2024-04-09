import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  constructor() {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllPRoducts() {
    return 'Esta funcion regresa varios productos';
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return 'Esta funcion regresa el producto con el id: ' + id;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return 'Esta funcion actualiza el producto con el id: ' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string, @Body() body: any) {
    return 'Esta funcion elimina el producto con el id: ' + id;
  }
  
}
