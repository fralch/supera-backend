import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Casos,  Pagos, Prisma } from '@prisma/client';

@Injectable()

export class PagosService {
    constructor(private prisma: PrismaService) {}
    
    async findAll(){
        // buscar todos los pagos y sus casos relacionados
        return this.prisma.pagos.findMany({
            include: {
                caso: true,
            },
        });
    }
   

}