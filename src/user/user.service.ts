import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserI } from './entities/user.interface';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  create(createUserDto: CreateUserDto): Observable<UserI> {
    
    return this.emailExists(createUserDto.email).pipe(
      switchMap((exists: boolean) => {
        if(!exists) {
          return this.authService.hashPassword(createUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the password with the hash and store it in the db
              createUserDto.password = passwordHash;
              return from(this.userRepository.save(createUserDto)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                })
              );
            })
          )
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      })
    )
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserI) => {

        if(user) {
          return this.validatePassword(loginUserDto.password, user.password).pipe(
            switchMap((passwordsMatches: boolean) => {
              if(passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) => this.authService.generateJwt(user))
                )
              } else {
                  throw new HttpException('Login was not successful', HttpStatus.UNAUTHORIZED);
              }
            })
          )
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    })
    )
  }

  findAll(): Observable<UserI[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<UserI> {
    return from(this.userRepository.findOne({ id }))
  }

  private findUserByEmail(email: string): Observable<UserI> {
    return from(this.userRepository.findOne({ email }, { select: ['id', 'email', 'name', 'password']}));
  }

  private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash)
  }

  private emailExists(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: UserI) => !!user)
    )
  }

}
