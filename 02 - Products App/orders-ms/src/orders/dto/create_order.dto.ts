import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { OrderItemsDto } from "./order_items.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemsDto)
    items: OrderItemsDto[]

}
