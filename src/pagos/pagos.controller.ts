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
import { PagosService } from './pagos.service';
import { Pagos } from '@prisma/client';

@Controller('pagos')
export class PagosController {
  constructor(private pagosService: PagosService) {}

  @Get()
  async findAll(): Promise<Pagos[]> {
    return this.pagosService.findAll();
  }

  @Post()
  async create(@Body() data) {
    /* 
    {
      "caso_id": 1, 
      "monto": 125.6, 
      "fecha_pago": "2024-06-17T22:03:58.000Z",
      "descripcion": "Descrip", 
      "metodo_pago": "yape", 
      "monto_total":  123.00, 
      "saldo_restante" : 153.00, 
      "estado": "pendiente"
    }
    */
    return this.pagosService.create(data);
  }
}
