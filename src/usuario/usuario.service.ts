import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Usuarios } from '@prisma/client'; 
import exp from "constants";


@Injectable()
export class UsuarioService {

    constructor(private prisma: PrismaService) {}

    async create(data: Usuarios) {
        return this.prisma.usuarios.create({ data });
    }

    async findAll() {
        return this.prisma.usuarios.findMany();
    }

    //login
    async findByUsuario(usuario: string): Promise<Usuarios | null> {
        return this.prisma.usuarios.findFirst({
          where: { usuario },
        });
    }

}
