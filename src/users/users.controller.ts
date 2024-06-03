import { Body, Controller, Delete, Get, Headers, InternalServerErrorException, Post, Put, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt'
import { send } from '../Mail/mail.service';
import { UsersDto } from './dto/users.dto';
import { PasswordResetsService } from 'src/passwordResets/passwordresets.service';
import { passwordResetsDto } from 'src/passwordResets/dto/passwordResets.dto';
@Controller('skydone/users/')
export class UsersController {
    constructor(private readonly userService:UsersService,private readonly passwordResetService:PasswordResetsService,private readonly jwtService: JwtService,private readonly httpService: HttpService){}
    @Get('ArrayProyectosEnteros')
    async ArrayProyectosEnteros() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=229fce2f-0250-4165-a675-d7c0e6939b5d';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }
    @Get('ArrayBonosEnteros')
    async ArrayBonoEnteros() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=932cd2db-3563-4da5-ac94-3e37a9e7b993';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }

    @Get('ArrayAcceso')
    async ArrayAcceso() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=89c5fd7a-3684-4ee2-90b8-e719147ad1a8';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }
    @Get('ArrayUser')
    async ArrayUser() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=89c5fd7a-3684-4ee2-90b8-e719147ad1a8';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';

    }

    @Get('ArrayFacturas')
    async ArrayFacturas() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=7592f9e3-e4a8-4ea5-9380-5946e282e22f';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }

    @Get('ArrayBonos')
    async ArrayBonos() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=a684f5bd-a188-45bc-943b-65b39cf0dffa';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }

    @Get('ArrayProyectos')
    async ArrayProyectos() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=04519a17-5996-435a-b454-77019c0d53d0';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }

    @Get('ArraySuscripciones')
    async ArraySuscripcciones() {
        const baseUrlClientes = 'https://apiskydone.info8925.workers.dev/?docId=d1470e30-1ae0-4a37-9dce-595bce91d30d';
        const config = {
            'headers': {
                'Authorization': `Bearer ${process.env.DINAUP_API_KEY}`,
            }
        }
        const response2 = await this.httpService.axiosRef.get(baseUrlClientes, config);
        return (response2?.data ?? false)
            ? response2?.data?.respuesta?.documento : '';
    }





    @Get('bonos')
    async GetBonos(@Headers() Headers: any) {
        try {
            const token = (Headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const idempresaTemporal = data.idEmpresa;
            const aaa = await this.ArrayBonos();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserBonos = resultado.filter(filas => filas.ClienteID === idempresaTemporal.toString());

            if (currentUserBonos.length > 0) {
                return {
                    ok: true,
                    users: currentUserBonos.reverse()
                }
            } else {
                return []; // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }


    @Post('proyectosId')
    async proyectosId(@Body('id') id: string) {
        try {
            const bbb = await this.ArrayProyectos();
            const resultado2 = JSON.parse(bbb || '')?.filas ?? [];
            const ProyectoNombre = resultado2.filter(filas => filas.IDID === id);

            const aaa = await this.ArrayProyectosEnteros();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserProyectos = resultado.filter(filas => filas.ProyectoID === id);

            if (currentUserProyectos.length > 0) {
                return {
                    ok: true,
                    users: currentUserProyectos.reverse(),
                    ProyectoNombre: ProyectoNombre
                }
            } else {
                return {
                    ok: false,
                    id: id,

                    ProyectoNombre: ProyectoNombre
                };
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }
    @Post('proyectosIdBono')
    async proyectosIdBono(@Body('id') id: string) {
        try {
            const aaa = await this.ArrayProyectosEnteros();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserProyectos = resultado.filter(filas => filas.BonoID === id);
            if (currentUserProyectos.length > 0) {
                return {
                    ok: true,
                    users: currentUserProyectos.reverse()
                }
            } else {
                return {
                    ok: false,
                    id: id
                };
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }

    @Post('proyectosIdFecha')
    async proyectosIdFecha(@Body('id') id: string, @Body('FechaInicio1') FechaInicio1: string, @Body('FechaInicio2') FechaInicio2: string) {
        try {
            const aaa = await this.ArrayProyectosEnteros();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const fechaActualizada = FechaInicio2 + ' 23:59:00'
            const currentUserProyectos = resultado.filter(filas => filas.ProyectoID === id);
            if (FechaInicio1 !== '' && FechaInicio2 !== '') {
                const busquedaPorFecha = currentUserProyectos.filter((filas) => filas.FechaInicio >= FechaInicio1 && filas.FechaInicio <= fechaActualizada)

                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha.reverse(),
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
            if (FechaInicio1 === "" && FechaInicio2 !== "") {
                const busquedaPorFecha = currentUserProyectos.filter((filas) => filas.FechaInicio <= fechaActualizada)


                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha.reverse(),
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
            if (FechaInicio1 !== "" && FechaInicio2 === "") {
                const busquedaPorFecha = currentUserProyectos.filter((filas) => filas.FechaInicio >= FechaInicio1)


                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha.reverse(),
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
            if (FechaInicio1 === "" && FechaInicio2 === "") {
                const currentUserProyectos = resultado.filter(filas => filas.ProyectoID === id);


                if (currentUserProyectos.length > 0) {
                    return {
                        ok: true,
                        users: currentUserProyectos.reverse(),
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }


    @Post('BonosId')
    async BonosId(@Body('id') id: string) {
        try {
            const aaa = await this.ArrayBonoEnteros();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserBonos = resultado.filter(filas => filas.BonoID === id);

            if (currentUserBonos.length > 0) {
                return {
                    ok: true,
                    users: currentUserBonos
                }
            } else {
                return {
                    ok: false
                }; // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }
    @Post('BonosIdFecha')
    async BonosIdFecha(@Body('id') id: string, @Body('FechaInicio1') FechaInicio1: string, @Body('FechaInicio2') FechaInicio2: string) {
        try {
            const aaa = await this.ArrayBonoEnteros();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserBonos = resultado.filter(filas => filas.BonoID === id);
            const fechaActualizada = FechaInicio2 + ' 23:59:00'
            if (FechaInicio1 !== '' && FechaInicio2 !== '') {
                const busquedaPorFecha = currentUserBonos.filter((filas) => filas.FechaDato >= FechaInicio1 && filas.FechaDato <= fechaActualizada)

                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
            if (FechaInicio1 === "" && FechaInicio2 !== "") {
                const busquedaPorFecha = currentUserBonos.filter((filas) => filas.FechaDato <= fechaActualizada)


                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
            if (FechaInicio1 !== "" && FechaInicio2 === "") {
                const busquedaPorFecha = currentUserBonos.filter((filas) => filas.FechaDato >= FechaInicio1)


                if (busquedaPorFecha.length > 0) {
                    return {
                        ok: true,
                        users: busquedaPorFecha,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    };
                }
            }
            if (FechaInicio1 === "" && FechaInicio2 === "") {
                if (currentUserBonos.length > 0) {
                    return {
                        ok: true,
                        users: currentUserBonos,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }
                } else {
                    return {
                        ok: false,
                        buscador1: FechaInicio1,
                        buscador2: FechaInicio2
                    }; // Devolver una lista vacía si no se encuentran bonos para el usuario
                }
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }





    @Get('facturas')
    async GetFacturas(@Headers() Headers: any) {
        try {
            const token = (Headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const idempresaTemporal = data.idEmpresa;
            const aaa = await this.ArrayFacturas();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserFacturas = resultado.filter(filas => filas.ClienteID === idempresaTemporal.toString());
            let FacuturasCambioFecha;
            for (let index = 0; index < currentUserFacturas.length; index++) {
                let element = currentUserFacturas[index];
                element.Fecha = element.Fecha.split(" ")[0]

            }

            if (currentUserFacturas.length > 0) {
                return {
                    ok: true,
                    users: currentUserFacturas
                }
            } else {
                return []; // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }


    @Post('BuscarNombre')
    async BuscarPorNombre(@Body('email') email: string) {
        try {
            const user = await this.userService.findByemail(email);
            if (user) {
                return {
                    ok: true,
                    user: user
                }
            } else {
                return {
                    ok: false,
                    user: 'No se ha cogido user'
                }
            }

        } catch (e) {
            return {
                mensaje: 'algo salio mal',
                error: e
            }
        }
    }



    @Get('proyectos')
    async GetPresupuestos(@Headers() Headers: any) {
        try {
            const token = (Headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const idempresaTemporal = data.idEmpresa;
            const aaa = await this.ArrayProyectos();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];
            const currentUserProyectos = resultado.filter(filas => filas.ClienteID === idempresaTemporal.toString());

            if (currentUserProyectos.length > 0) {
                return {
                    ok: true,
                    users: currentUserProyectos.reverse()
                }
            } else {
                return []; // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }


    @Get('suscripciones')
    async GetSuscripciones(@Headers() Headers: any) {
        try {
            const token = (Headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const idempresaTemporal = data.idEmpresa;
            const aaa = await this.ArraySuscripcciones();
            const resultado = JSON.parse(aaa || '')?.filas ?? [];

            const currentUserSuscripciones = resultado.filter(filas => filas.ClienteID === idempresaTemporal.toString());
            for (let index = 0; index < currentUserSuscripciones.length; index++) {
                let element = currentUserSuscripciones[index];
                element.Findeservicio = element.Findeservicio.split(" ")[0]


            }

            if (currentUserSuscripciones.length > 0) {
                return {
                    ok: true,
                    users: currentUserSuscripciones.reverse()
                }
            } else {
                return []; // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }
    @Get('users')
    async getUsers() {
        const listaClientes = this.userService.getAll();
        return listaClientes
    }

    @Get('cogerAcceso')
    async cogerAcceso() {
        const listaClientes = (await this.getUsers());
        let listadoEmails = [];
        let listadoComprueba = [];
        for (let index = 0; index < listaClientes.length; index++) {
            listadoEmails.push(listaClientes[index].email);
        }
        const aaa = await this.ArrayAcceso();
        const resultado = JSON.parse(aaa || '')?.filas;
        resultado.forEach(element => {
            if (!listadoEmails.includes(element?.Cuentadecorreoprincipal)) {
                listadoComprueba.push(element);

            }
        });
        return{
            ok:true,
            listadoComprueba:listadoComprueba
        } 

    } catch(error) {
        console.log('error al conectar, el usuario no esta en la base de datos');
        console.log(error);
    }



    @Get('acceso')
    async comprobarAcceso(@Headers() Headers: any) {
        try {
            const token = (Headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const idempresaTemporal = data.idEmpresa;
            const aaa = await this.ArrayAcceso();
            const resultado = JSON.parse(aaa || '')?.filas;
            const currentUserFacturas = resultado.filter(filas => filas.ID === idempresaTemporal.toString());
            if (currentUserFacturas[0].Puedeconectaraweb === "1") {
                return {
                    ok: 1,
                    mensaje: "acceso permitido"
                }
            } else {
                return {
                    ok: 0,
                    mensaje: "acceso restringido, comuniquese con nuestro personal"
                } // Devolver una lista vacía si no se encuentran bonos para el usuario
            }
        } catch (error) {
            console.log('error al conectar, el usuario no esta en la base de datos');
            console.log(error);
        }
    }

    @Get('usuario')
    async GetUser(@Headers() headers: any) {
        try {
            const token = (headers?.authorization ?? '').split('Bearer ').pop();
            if (!token) {
                console.log("error de autorización");
                return null; // O algún otro comportamiento que desees
            }
            const data = this.jwtService.verify(token);
            const comprobar = this.jwtService.decode(token);
            console.log(comprobar);
            
            if (!data) {
                return {
                    ok: false,
                    user: 'No se pudo',
                    mensage: 'Todo ha ido mal'
                }
            }
            const idempresaTemporal = data.idEmpresa;
            const user = await this.userService.findByIdEmpresa(idempresaTemporal.toString());
            if (!user) {
                return {
                    ok: false,
                    user: 'No se pudo',
                    mensage: 'Todo ha ido mal'
                }
            }
            return {
                ok: true,
                user: user,
                mensaje:comprobar,
                mensage: 'Todo ha ido bien'
            }
        } catch (error) {
            console.log(error);
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Error de autorización');
            } else {
                throw new InternalServerErrorException('Error interno del servidor');
            }
        }
    }

    @Post('register')
    async register(@Body() userDto: UsersDto) {
        userDto['password'] = await bcrypt.hash(userDto?.password ?? '', 12);
        try {
            const user = await this.userService.create(userDto);
            const jwt = await this.jwtService.signAsync({
                nombreEmpresa: user.nombreEmpresa,
                idEmpresa: user.idEmpresa,
                email: user.email,
                password: user.password,
                admin: user.admin,
                puedeConectarse: user.puedeConectarse
            })

            return {
                ok: true,
                token: jwt,
                user: user,
            }

        } catch (e) {
            return {
                ok: false,
                e
            }
        }

    }


    @Post('registrarCliente')
    async registrarClientes(
        @Body('ID') idCliente: string,
        @Body('password') newPassword: string,
        @Body('admin') admin: string) {
        const aaa = await this.ArrayAcceso();
        const resultado2 = JSON.parse(aaa || '')?.filas ?? [];
        const currentUser2 = resultado2.find((resultados2) => resultados2.ID == idCliente);
        let userDto: UsersDto = {
            nombreEmpresa: currentUser2.Nombrecompleto,
            idEmpresa: idCliente,
            email: currentUser2.Cuentadecorreoprincipal,
            password: newPassword,
            admin: admin,
            Puedeconectaraweb: currentUser2.Puedeconectaraweb
        }
        userDto['password'] = await bcrypt.hash(userDto?.password ?? '', 10);
        //const hashedPassword= await bcrypt.hash(userDto.password,12);
        try {
            const user = await this.userService.create(userDto);

            return {
                ok: true,
                user: user,
            }

        } catch (e) {
            return {
                ok: false,
                e
            }
        }

    }



    //Login 
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const user = await this.userService.findByemail( email )
        if (!user) {
            return {
                ok: false,
                mensaje: 'Usuario/Contraseña incorrecto'
            }
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return {
                ok: false,
                mensaje: 'Usuario/Contraseña incorrecto **DEV**'
            }
        }
        const jwt = await this.jwtService.signAsync({
            idEmpresa: user.idEmpresa
        })
        return {
            ok: true,
            token: jwt
        }
    }


    @Get('user')
    async users(@Headers() headers: any) {
        try {
            const token = (headers?.authorization ?? '').split('Bearer ').pop();
        const data = await this.jwtService.verifyAsync(token);
                if (!data) {
                return {
                    ok: false,
                    mensaje: 'Token incorrecto'
                }
            }
            const user = await this.userService.findByIdEmpresa(data.idEmpresa);
            return {
                ok: true,
                usuario: (({
                    nombreEmpresa,
                    idEmpresa,
                    email,
                    admin
                }) => ({
                    nombreEmpresa,
                    idEmpresa,
                    email,
                    admin
                }))(user)
            }
        } catch (error) {
            console.log(error);
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Error de autorización');
            } else {
                throw new InternalServerErrorException('Error interno del servidor');
            }
        }
    }

    async isValid(token: string) {
        const data = await this.passwordResetService.findByToken(token);
        const { fechaExpiracion, usado } = data || {};

        return Boolean(
            !usado
            && fechaExpiracion > Date.now().toString()
        );

    }

    @Post('cambiopassword/user/:token')
    async GetPruebas(token: string) {
        try {
            if (this.isValid(token)) {
                return {
                    ok: true,
                    menssage: 'Autorizado'
                }
            } else {
                return {
                    ok: false,
                    mensaje: 'Token incorrecto'
                }
            }
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }



    @Post('comprobar')
    async comprobarToken(@Body('token') token: string) {
        try {
            const comprobarToken = await this.jwtService.verifyAsync(token);
            if (comprobarToken) {
                return {
                    ok: true,
                    mensaje: 'Puedes continuar'
                }
            } else {
                return {
                    ok: false,
                    mensaje: 'No me convences'
                }
            }
        } catch (e) {
            console.log(e);

        }
    }




    @Delete('borrar')
    async deletenoticia(@Body('email') email: string) {
        return this.userService.delete(email);
    }



    @Put('email')
    async updateUser(
        @Body('token') token: string,
        @Body('password1') newPassword: string,
        @Body('password2') confirmPassword: string,
    ) {
        try {
            // Verificar el token
            const passwordReset = await this.passwordResetService.findByToken(token);
            if (!passwordReset) {
                return { ok: false, message: 'Token no valido o caducado' }
            };
            const user = await this.userService.findByIdEmpresa(passwordReset.claveCliente);
            const tokenbd = await this.passwordResetService.findByToken(token);

            // Si el token no es válido
            if (!passwordReset) {
                return {
                    ok: false,
                    mensaje: 'Token inválido'
                }
            }
            if (!tokenbd) {
                return {
                    ok: false,
                    mensaje: 'Token no encontrado en la base de datos'
                }
            }

            if (user.idEmpresa == tokenbd.claveCliente) {

                if (newPassword !== confirmPassword) {
                    return {
                        ok: false,
                        mensaje: 'Las contraseñas no coinciden'
                    }
                } else {
                    try {
                        const fechaAhora = new Date(); // Crea la fecha actual, incluyendo horas, minutos y segundos
                        const year = fechaAhora.getFullYear();
                        const mes = fechaAhora.getMonth(); // Los meses empiezan en 0
                        const dia = fechaAhora.getDate();
                        const minutos = fechaAhora.getMinutes();
                        const horas = fechaAhora.getHours(); // Para no poder reservar el mismo dia
                        const fecha = `${dia}-${mes}-${year}: ${horas}-${minutos}`;

                        if (tokenbd.fechaExpiracion < fecha || tokenbd.usado == "1") {
                            return {
                                ok: false,
                                mensaje: "Token caducado haga una nueva solicitud de cambio"
                            }

                        } else {
                            // Actualización de Usuario
                            let updateUser: UsersDto = { email: user.email, password: newPassword, nombreEmpresa: user.nombreEmpresa, idEmpresa: user.idEmpresa, admin: user.admin, Puedeconectaraweb: user.Puedeconectaraweb }
                            updateUser['password'] = await bcrypt.hash(newPassword ?? '', 12);
                            let updateToken: passwordResetsDto = { claveCliente: tokenbd.claveCliente, tokenCliente: tokenbd.tokenCliente, fechaExpiracion: tokenbd.fechaExpiracion, usado: "1" }
                            const aa = await this.passwordResetService.update(tokenbd.claveCliente, updateToken);
                            await this.userService.update(user.idEmpresa, updateUser);
                            console.log(updateUser)
                            return {
                                ok: true,
                                email: user.email
                            };
                        }
                    } catch (error) {
                        console.log(error);
                        if (error instanceof UnauthorizedException) {
                            console.log(error);
                            throw new UnauthorizedException('Error de autorización');
                        } else {
                            console.log(error);
                            throw new InternalServerErrorException('Error interno del servidor');
                        }
                    }
                }
            } else {
                return {
                    ok: false,
                    mensaje: ' no me cuadras, miralo a ver'
                }
            }
        } catch (error) {
            console.log(error);
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Error de autorización');
            } else {
                throw new InternalServerErrorException('Error interno del servidor');
            }
        }
    }



    async cogerUser(email: string) {
        const user = await this.userService.findByemail( email );
    }

    //Verifica el usuario y manda un correo con el token

    @Post('cambios')
    async enviarCorreos(@Body('email') email: string) {
        const user = await this.userService.findByemail(email);


        if (user == null) {
            return {
                ok: false,
                mensaje: 'El correo electrónico no está en la base de datos'
            }
        }
        var randomstring = require("randomstring");
        let result = randomstring.generate();
        const fechaAhora = new Date(); // Crea la fecha actual, incluyendo horas, minutos y segundos
        const year = fechaAhora.getFullYear();
        const mes = fechaAhora.getMonth(); // Los meses empiezan en 0
        const dia = fechaAhora.getDate();
        const minutos = fechaAhora.getMinutes();
        const horas = fechaAhora.getHours(); // Para no poder reservar el mismo dia
        const fecha = `${dia}/${mes}/${year} ${horas}h:${minutos}m`;
        let saveDB: passwordResetsDto = { claveCliente: user.idEmpresa, tokenCliente: result, fechaExpiracion: fecha, usado: "0" }
        const tokenDB = await this.passwordResetService.create(saveDB);

        try {
            const props = {
                to: user.email,
                bcc: ['unpenedepato@gmail.com'],
                cc: 'unpenedepato@gmail.com',
                subject: "Cambiar contraseña",
                text: "Hola nos comunicamos contigo por que hemos visto que quieres cambiar tu contraseña, aqui te dejo un enlace para que puedas cambiar la contraseña http://localhost:4200/cambioUsuario/user/" + result,
                html: "<p>Hola nos comunicamos contigo por que hemos visto que quieres cambiar tu contraseña, aqui te dejo un enlace para que puedas cambiar la contraseña </p>" +
                    "<a href='http://localhost:4200/cambioUsuario/user/" + result + "'>cambiar la contraseña</a>", // html body
            }
            const success = send(props)
            return {
                ok: success,
                mensaje: 'El correo electrónico *********** está en la base de datos',
            };
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        };
    }

}
