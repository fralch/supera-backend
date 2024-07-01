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

  async findOnebyCaso(caso_id: number) {
    // buscar un pago por su id
    return this.prisma.pagos.findFirst({
      where: { caso_id },
    });
  }

  async create(data: Prisma.PagosCreateInput) {
    // crear un nuevo pago
    return this.prisma.pagos.create({
      data,
    });
  }

  async update(id: number, data) {
    // actualizar un pago
    console.log(id, data);
    return this.prisma.pagos.update({
      where: { id },
      data,
    });
  }
}
