import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';
import { UsersDto } from './dto/users.dto';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private usersRepository:UsersRepository) { }

    async getAll(): Promise<UsersEntity[]> {
        const list = await this.usersRepository.find();
        if(!list.length){
           throw new  NotFoundException({menssage:'la lista esta vacia'});
        }
        return list;
    }

    async findByIdEmpresa(idEmpresa: string): Promise<UsersEntity>{
        const user = await this.usersRepository.findOneBy({idEmpresa});
        return user;
    }

    async findByemail(email: string): Promise<UsersEntity>{
      const user = await this.usersRepository.findOneBy({email});
      return user;
  }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
    
      async create(dto:UsersDto):Promise<any>{
        const user = this.usersRepository.create(dto);
        await this.usersRepository.save(user);
        return{ message:`user creado`};
      }
      async update(idEmpresa:string,dto:UsersDto):Promise<any>{
        const user = await this.findByIdEmpresa(idEmpresa);
        dto.email? user.email = dto.email: user.email = user.email;
        dto.password? user.password = dto.password: user.password = user.password;
        dto.admin? user.admin = dto.admin: user.admin = user.admin;
        dto.nombreEmpresa? user.nombreEmpresa = dto.nombreEmpresa: user.nombreEmpresa = user.nombreEmpresa;
        dto.idEmpresa? user.idEmpresa = dto.idEmpresa: user.idEmpresa = user.idEmpresa;
        dto.Puedeconectaraweb? user.Puedeconectaraweb = dto.Puedeconectaraweb: user.Puedeconectaraweb = user.Puedeconectaraweb;
        await this.usersRepository.save(user)
        return{ message:`user actualizado`};
      }

      async delete(email:string):Promise<any>{
        const user = await this.findByemail(email);
        await this.usersRepository.delete(user);
        return{ message:`user ${user.email} eliminado`};
      }





}
