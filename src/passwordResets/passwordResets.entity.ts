import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'passwordResets'})
export class PasswordResetsEntity{
@PrimaryGeneratedColumn()
id:string;
@Column({type:'varchar',length:255})
claveCliente:string;
@Column({type:'varchar',length:255})
usado:string;
@Column({type:'varchar',length:255})
tokenCliente:string;
@Column({type:'varchar',length:255})
fechaExpiracion:string;
}
