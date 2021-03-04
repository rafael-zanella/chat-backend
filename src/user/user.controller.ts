import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserI } from './entities/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<UserI> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<string> {
    return this.userService.login(loginUserDto);
  }

  @Get()
  findAll(): Observable<UserI[]> {
    return this.userService.findAll();
  }
}
