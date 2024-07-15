import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Casos, Clientes, Pagos, Prisma } from '@prisma/client';

@Injectable()
export class CasosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // buscar todos los casos y sus clientes relacionados y pagos relacionados
    return this.prisma.casos.findMany({
      include: {
        cliente: true,
        pagos: true,
      },
      orderBy: {
        fecha: 'desc',
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

  async updateCaso(id: number, data: Prisma.CasosUpdateInput) {
    return this.prisma.casos.update({
      where: { id },
      data,
      include: {
        cliente: true,
        pagos: true,
      },
    });
  }

  async create(data: Prisma.CasosCreateInput) {
    return this.prisma.casos.create({ data });
  }

  async uploadFile(id: number, data: any) {
    return this.prisma.casos.update({
      where: { id },
      data,
    });
  }
}
