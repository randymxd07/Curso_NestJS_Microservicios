import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';

@Controller()
export class OrdersController {

  constructor(private readonly client: OrdersService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.client.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() orderPAginationDto: OrderPaginationDto) {
    return this.client.findAll(orderPAginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.client.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.client.changeStatus(changeOrderStatusDto);
  }

}
