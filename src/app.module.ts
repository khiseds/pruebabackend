import { PasswordResetsModule } from './passwordResets/passwordresets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { UsersEntity } from './users/users.entity';
import { PasswordResetsEntity } from './passwordResets/passwordResets.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'Clientes_skydone ',
      password: '4sky898,S',
      database: 'areacliente',
      entities: [UsersEntity,PasswordResetsEntity],
      synchronize: false,
    }),
    PasswordResetsModule, 
    UsersModule,
    HttpModule,

    JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '1h' }
  }),
  ],
  controllers: [ AppController],
  providers: [ AppService],
})
export class AppModule { }
