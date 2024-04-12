import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id })
      );

      return order;

    } catch (error) {

      throw new RpcException(error);

    }
    
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() statusDto: StatusDto,
  ) {

    try {

      return this.client.send('changeOrderStatus', { id, status: statusDto.status })

    } catch (error) {

      throw new RpcException(error);

    }
    
  }

}
