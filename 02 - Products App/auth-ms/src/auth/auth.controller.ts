import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser() {
    return 'register user';
  }

  @MessagePattern('auth.login.user')
  loginUser() {
    return 'login user';
  }

  @MessagePattern('auth.verify.user')
  verifyUser() {
    return 'verify token';
  }
  
}
