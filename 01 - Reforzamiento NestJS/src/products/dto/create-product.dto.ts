import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Type(() => Number) //* TRY TO TRANSFORM THE DATA THAT REACHES A NUMBER *//
    price: number;

}
