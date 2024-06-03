import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { PasswordResetsService } from 'src/passwordResets/passwordresets.service';
import { PasswordResetsEntity } from 'src/passwordResets/passwordResets.entity';


@Module({
  imports:[
  TypeOrmModule.forFeature([UsersEntity,PasswordResetsEntity]),
  PassportModule,
  HttpModule,
  JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '1h' }
  }),
],
  providers: [UsersService,PasswordResetsService],
  controllers: [UsersController]
})
export class UsersModule {}
