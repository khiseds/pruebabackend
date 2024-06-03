import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordResetsEntity } from './passwordResets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordResetsRepository } from './passwordResets.repository';
import { passwordResetsDto } from './dto/passwordResets.dto';

@Injectable()
export class PasswordResetsService { 
    constructor(@InjectRepository(PasswordResetsEntity) private passwordResetsRepository:passwordResetsRepository) { }

    async getAll(): Promise<PasswordResetsEntity[]> {
        const list = await this.passwordResetsRepository.find();
        if(!list.length){
           throw new  NotFoundException({menssage:'la lista esta vacia'});
        }
        return list;
    }

    async findByIdEmpresa(claveCliente: string): Promise<PasswordResetsEntity>{
        const user = await this.passwordResetsRepository.findOneBy({claveCliente});
        return user;
    }
    async findByToken(tokenCliente: string): Promise<PasswordResetsEntity>{
      const user = await this.passwordResetsRepository.findOneBy({tokenCliente});
      return user;
  }

    async remove(claveCliente: number): Promise<void> {
        await this.passwordResetsRepository.delete(claveCliente);
      }
    
      async create(dto:passwordResetsDto):Promise<any>{
        const user = this.passwordResetsRepository.create(dto);
        await this.passwordResetsRepository.save(user);
        return{ message:`passwordReset creado`};
      }
      async update(claveCliente:string,dto:passwordResetsDto):Promise<any>{
        const user = await this.findByIdEmpresa(claveCliente);
        dto.claveCliente? user.claveCliente = dto.claveCliente: user.claveCliente = user.claveCliente;
        dto.tokenCliente? user.tokenCliente = dto.tokenCliente: user.tokenCliente = user.tokenCliente;
        dto.fechaExpiracion? user.fechaExpiracion = dto.fechaExpiracion: user.fechaExpiracion = user.fechaExpiracion;
        dto.usado? user.usado = dto.usado: user.usado = user.usado;
        await this.passwordResetsRepository.save(user)
        return{ message:`passwordReset actualizado`};
      }

      async delete(claveCliente:string):Promise<any>{
        const user = await this.findByIdEmpresa(claveCliente);
        await this.passwordResetsRepository.delete(user);
        return{ message:`passwordReset ${user.tokenCliente} eliminado`};
      }





}

