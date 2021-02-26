import { User } from '../entities/user.entity';

export class InfoUserDto {

  name: string;
  email: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
  }

}
