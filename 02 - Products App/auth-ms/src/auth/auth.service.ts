import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto/register_user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt_payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly jwtService: JwtService
    ){
        super();
    }
    
    onModuleInit() {
        this.$connect();
        this.logger.log('MongoDB connected');
    }

    async signJWT(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        try {

            const { email, name, password } = registerUserDto;

            const user = await this.user.findUnique({
                where: { 
                    email: email
                }
            });

            if(user) {
                throw new RpcException({
                    status: 400,
                    message: 'User already exists'
                });
            }

            const newUser = await this.user.create({
                data: {
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password, 10) // TODO: ENCRIPTAR LA CONTRASEÑA //
                }
            });

            const { password: __, ...data } = newUser;

            return {
                user: data,
                token: await this.signJWT(data),
            }
            
        } catch (error) {
            
            throw new RpcException({
                status: 400,
                message: error.message
            });

        }

    }

    async loginUser(loginUserDto: LoginUserDto) {

        try {

            const { email, password } = loginUserDto;

            const user = await this.user.findUnique({
                where: { email }
            });

            if(!user) {
                throw new RpcException({
                    status: 400,
                    message: 'User/Password not valid'
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if(!isPasswordValid) {
                throw new RpcException({
                    status: 400,
                    message: 'User/Password not valid'
                })
            }

            const { password: __, ...data } = user;

            return {
                user: data,
                token: await this.signJWT(data),
            }
            
        } catch (error) {
            
            throw new RpcException({
                status: 400,
                message: error.message
            });

        }

    }

    async verifyToken(token: string) {

        try {
            
            const { sub, iat, exp, ...data } = this.jwtService.verify(token, {
                secret: envs.jwtSecret,
            });

            return {
                user: data,
                token: await this.signJWT(data)
            }

        } catch (error) {

            this.logger.log(error);
            
            throw new RpcException({
                status: 400,
                message: 'Invalid token'
            })

        }

    }

}
