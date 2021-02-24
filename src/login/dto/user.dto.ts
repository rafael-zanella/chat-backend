import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {

  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  readonly password: string;
}