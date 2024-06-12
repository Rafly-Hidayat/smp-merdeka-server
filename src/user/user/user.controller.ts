import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    const result = await this.userService.register(username, email, password);
    return {
      message: 'Successfully registered',
      data: result,
    };
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    const result = await this.userService.login(username, password);
    return {
      message: 'Successfully login',
      data: result,
    };
  }
}
