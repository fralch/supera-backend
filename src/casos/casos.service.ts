import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Casos, Clientes, Pagos, Prisma } from '@prisma/client';

@Injectable()

export class CasosService {
  constructor(private prisma: PrismaService) {}

  
  async findAll(){
  // buscar todos los casos y sus clientes relacionados y pagos relacionados
  return this.prisma.casos.findMany({
      include: {
        cliente: true, 
        pagos: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.casos.findUnique({
      where: { id },
      include: {
        cliente: true,
        pagos: true,
      },
    });
  }


  
}