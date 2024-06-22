import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Casos, Pagos, Prisma } from '@prisma/client';

@Injectable()
export class PagosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // buscar todos los pagos y sus casos relacionados
    return this.prisma.pagos.findMany({
      include: {
        // incluir a los clientes relacionados con los casos
        caso: true,
      },
    });
  }

  async create(data: Prisma.PagosCreateInput) {
    // crear un nuevo pago
    return this.prisma.pagos.create({
      data,
    });
  }
}
