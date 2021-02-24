import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    UserModule
  ],
  controllers: [
    AppController, 
    LoginController
  ],
  providers: [AppService],
})

export class AppModule {}
