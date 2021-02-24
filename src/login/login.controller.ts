import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('login')
export class LoginController {

  @Post()
  sendCredentials(@Body() userDto: UserDto): Object {
    return { 
      jwt: 'this_is_a_jwt_token',
    };
  }

}
