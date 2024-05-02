import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuarios } from "@prisma/client";

@Controller('usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @Post()
    async create(@Body() data: Usuarios) {
        return this.usuarioService.create(data);
    }

    @Get()
    async findAll() {
        return this.usuarioService.findAll();
    }

    @Post('login')
    async login(@Body() data: {usuario: string, clave: string}): Promise<Usuarios | null> {
        const usuario = await this.usuarioService.findByUsuario(data.usuario);
        if(usuario && usuario.clave === data.clave) {
            return usuario;
        } else {
            throw new BadRequestException('Usuario o contraseña incorrectos');
        }
    }

  
}