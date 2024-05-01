import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CasosService } from "./casos.service";
import { Casos } from "@prisma/client";

@Controller('casos')
export class CasosController {
  constructor(private casosService: CasosService) {}

  @Post()
  async create(@Body() data: Casos): Promise<Casos> {
    return this.casosService.create(data);
  }

  @Get()
  async findAll(): Promise<Casos[]> {
    return this.casosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Casos> {
    return this.casosService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Casos): Promise<Casos> {
    return this.casosService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Casos> {
    return this.casosService.remove(Number(id));
  }
}