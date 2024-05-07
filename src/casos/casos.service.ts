import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Casos, Prisma } from '@prisma/client';

@Injectable()

export class CasosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CasosCreateInput): Promise<Casos> {
    return this.prisma.casos.create({ data });
  }

  async findAll(): Promise<Casos[]> {
    return this.prisma.casos.findMany();
  }

  async findOne(id: number): Promise<Casos> {
    return this.prisma.casos.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.CasosCreateInput): Promise<Casos> {
    // const currentDate = new Date();
    const nuevoCasoData: Prisma.CasosCreateInput = {
      ...data,
      // fecha: currentDate, // Agregar la fecha y hora actual al objeto de datos
    };
    return this.prisma.casos.update({
      where: { id },
      data: nuevoCasoData,
    });
  }

  async remove(id: number): Promise<Casos> {
    return this.prisma.casos.delete({
      where: { id },
    });
  }
}