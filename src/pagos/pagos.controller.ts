import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PagosService } from "./pagos.service";
import { Pagos } from "@prisma/client";

@Controller('pagos')
export class PagosController {
  constructor(private casosService: PagosService) {}

    @Get()
    async findAll(): Promise<Pagos[]> {
        return this.casosService.findAll();
    }
 


  
}