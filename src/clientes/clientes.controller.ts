import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientesService } from "./clientes.service";
import { Clientes } from "@prisma/client";

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

  
}