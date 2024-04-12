import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto, UpdateOrderDto } from './dto';
import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Order, PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  /**-----------------------------
   ** CREATE ORDER FUNCTION
   *  @param createOrderDto 
   *  @returns {Order}
  --------------------------------*/
  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto
    });
  }

  /**--------------------------------------------------
   ** FIND ALL ORDERS FUNCTION
   *  @param {OrderPaginationDto} orderPAginationDto 
   *  @returns {Order[]}
  -----------------------------------------------------*/
  async findAll(orderPAginationDto: OrderPaginationDto) {

    const totalPages = await this.order.count({
      where: {
        status: orderPAginationDto.status,
      }
    });

    const currentPage = orderPAginationDto.page;

    const perPage = orderPAginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPAginationDto.status,
        }
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      }
    }

  }

  /**---------------------------
   ** FIND ONE ORDER FUNCTION
   *  @param {string} id
   *  @returns {Order}
  ------------------------------*/
  async findOne(id: string) {

    const order = await this.order.findFirst({
      where: { id }
    });

    if(!order) {
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Order with id: ${id} not found`
      });
    }

    return order;
    
  }

  /**----------------------------------------
   ** CHANGE ORDER STATUS FUNCTION
   *  @param {ChangeOrderStatusDto} id
   *  @param {ChangeOrderStatusDto} status
   *  @returns {Order}
  -------------------------------------------*/
  async changeStatus({ id, status }: ChangeOrderStatusDto) {

    const order = await this.findOne(id);

    if(order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: {
        status: status,
      }
    });

  }
  
}
