import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Clientes, Prisma, Casos, Pagos } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.clientes.findMany({
      include: {
        casos: {
          include: {
            pagos: true,
          },
        },
      },
    });
  }

  async findOne(dni: number) {
    return this.prisma.clientes.findUnique({
      where: { dni },
      include: {
        casos: true,
      },
    });
  }

  // create a new client
  async create(data: Prisma.ClientesCreateInput) {
    return this.prisma.clientes.create({ data });
  }

  async updateDNI(data) {
    const { dni, nuevo_dni, ...rest } = data;

    // Iniciar una transacción
    const result = await this.prisma.$transaction(async (prisma) => {
      // Verificar si el cliente existe
      const clienteExistente = await prisma.clientes.findUnique({
        where: { dni: Number(dni) },
      });

      if (!clienteExistente) {
        throw new Error(`Cliente con dni ${dni} no encontrado`);
      }

      // Actualizar el dni del cliente
      const actualizacion = await prisma.clientes.update({
        where: { dni: Number(dni) },
        data: {
          dni: Number(nuevo_dni),
          ...rest,
        },
      });

      // Actualizar las referencias en la tabla Casos
      await prisma.casos.updateMany({
        where: { cliente_dni: Number(dni) },
        data: { cliente_dni: Number(nuevo_dni) },
      });

      return actualizacion;
    });

    return result;
  }
}
