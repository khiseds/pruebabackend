import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetsEntity } from './passwordResets.entity';
import { PasswordResetsService } from './passwordresets.service';
import { PasswordResetsController } from './passwordresets.controller';

@Module({
    imports:[TypeOrmModule.forFeature([PasswordResetsEntity])],
    providers: [PasswordResetsService],
    controllers: [PasswordResetsController]
})
export class PasswordResetsModule { }
