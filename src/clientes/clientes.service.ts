import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Clientes, Prisma } from '@prisma/client';

@Injectable()

export class ClientesService {
    constructor(private prisma: PrismaService) {}
    
    
    async findAll(){
        // buscar todos los clientes y sus casos relacionados
        return this.prisma.clientes.findMany({
        include: {
            // incluir a los casos relacionados con los clientes
            casos: true,
            
        },
        });
    }
    
    async findOne(id: number) {
        return this.prisma.clientes.findUnique({
        where: { id },
        include: {
            casos: true,
        },
        });
    }
}
