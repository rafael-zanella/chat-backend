import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { User } from './entities/user.entity';
import { InfoUserDto } from './dto/info-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user)
    
    return new InfoUserDto(user);
  }

  async findAll() {
    const userList = await this.userRepository.find();    
    return userList.map(user => new InfoUserDto(user));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if(!user) {
      throw new NotFoundException(`User #${id} was not found`);
    }

    return new InfoUserDto(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // TODO
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    // TODO
    return `This action removes a #${id} user`;
  }

}
