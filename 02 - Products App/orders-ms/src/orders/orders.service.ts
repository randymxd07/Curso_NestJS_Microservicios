import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto, UpdateOrderDto } from './dto';
import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Order, PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ){
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  /**------------------------------------------
   ** CREATE ORDER FUNCTION
   *  @param {CreateOrderDto} createOrderDto 
   *  @returns {Order}
  ---------------------------------------------*/
  async create(createOrderDto: CreateOrderDto) {

    try {

      // 1. Confirm the Ids of the products

      const productIds = createOrderDto.items.map(item => item.productId);

      const products: any[] = await firstValueFrom(
        this.productsClient.send({ cmd: 'validate_products' }, productIds)
      )

      // 2. Value calculations

      const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
        const price = products.find(product => product.id === orderItem.productId).price;
        return price * orderItem.quantity;
      }, 0);

      const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      // 3. Create a database transaction

      const order = await this.order.create({
        data: {
          totalAmount: totalAmount,
          totalItems: totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map(orderItem => ({
                price: products.find(product => product.id === orderItem.productId).price,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              }))
            }
          }
        },
        include: {
          OrderItem: {
            select: {
              price: true, 
              quantity: true, 
              productId: true,
            }
          },
        },
      });

      return {
        ...order,
        OrderItem: order.OrderItem.map((orderItem) => ({
          name: products.find(product => product.id === orderItem.productId).name,
          ...orderItem,
        }))
      }
      
    } catch (error) {

      throw new RpcException({
        message: 'Check logs',
        status: HttpStatus.BAD_REQUEST,
      });
      
    }

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
      where: { id },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
          }
        }
      }
    });

    if(!order) {
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Order with id: ${id} not found`
      });
    }

    const productIds = order.OrderItem.map(orderItem => orderItem.productId);

    const products: any[] = await firstValueFrom(
      this.productsClient.send({ cmd: 'validate_products' }, productIds)
    );

    return {
      ...order,
      OrderItem: order.OrderItem.map(orderItem => ({
        name: products.find(product => product.id === orderItem.productId).name,
        ...orderItem,
      }))
    }
    
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
