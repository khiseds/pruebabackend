import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PasswordResetsService } from './passwordresets.service';
import { passwordResetsDto } from './dto/passwordResets.dto';

@Controller('passwordResets')
export class PasswordResetsController { 

    constructor(private readonly passwordResets:PasswordResetsService){}

    @Get()
    async getAlls(){
        return this.passwordResets.getAll();
    }
    
    @Get(':id')
    async getOne(@Param('id')id:string){
        return await this.passwordResets.findByIdEmpresa(id);
    }
    
    @Post()
    async create(@Body()dto:passwordResetsDto){
        return await this.passwordResets.create(dto);
    }

    @Put(':id')
    async update(@Param('id')id:string, @Body()dto:passwordResetsDto){
        return await this.passwordResets.update(id,dto);
    }
    @Delete(':id')
    async delete(@Param('id')id:string){
        return await this.passwordResets.delete(id);
    }


}
