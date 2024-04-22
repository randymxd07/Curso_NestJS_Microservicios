import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

}