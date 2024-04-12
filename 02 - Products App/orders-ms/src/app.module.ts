import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [OrdersModule, NatsModule],
})
export class AppModule {}
