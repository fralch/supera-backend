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
import { CasosService } from './casos.service';
import { Casos } from '@prisma/client';

@Controller('casos')
export class CasosController {
  constructor(private casosService: CasosService) {}

  @Get()
  async findAll(): Promise<Casos[]> {
    return this.casosService.findAll();
  }

  //update caso
  @Post('update/:id')
  async updateCaso(@Param('id') id: number, @Body() data: Casos) {
    return this.casosService.updateCaso(+id, data);
  }

  // create
  @Post()
  async create(@Body() data) {
    return this.casosService.create(data);
  }
}
