import { IsNumber, IsPositive } from "class-validator";

export class OrderItemsDto {

    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    price: number;

}