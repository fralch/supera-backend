import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Clientes } from '@prisma/client';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  async findAll(): Promise<Clientes[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clientes> {
    return this.clientesService.findOne(Number(id));
  }

  @Post()
  async updateDNI(@Body() data) {
    if (!data.dni) {
      throw new BadRequestException('El dni es requerido');
    }
    // verificar si el nuevo dni ya existe
    const clienteExistente = await this.clientesService.findOne(data.nuevo_dni);
    if (clienteExistente) {
      throw new BadRequestException(
        `El cliente con dni ${data.nuevo_dni} ya existe`,
      );
    }
    return this.clientesService.updateDNI(data);
  }
}
