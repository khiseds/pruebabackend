import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UsersEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({type:'varchar',length:255,unique:true})
email:string;
@Column({type:'varchar',length:255})
idEmpresa:string;
@Column({type:'varchar',length:255})
nombreEmpresa:string;
@Column({type:'varchar',length:255})
password:string;
@Column({type:'varchar',length:255})
admin:string;
@Column({type:'varchar',length:255})
Puedeconectaraweb:string;
}