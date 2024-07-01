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
    if (!data.caso) {
      throw new BadRequestException('La propiedad "caso" es obligatoria');
    }
    return this.pagosService.create(data);
  }

  @Post('montototal')
  async updateMontoTotal(@Body() data) {
    // console.log(data);
    const { id, monto_total } = data;
    if (!id || !monto_total) {
      throw new BadRequestException('id y monto_total son requeridos');
    }
    let pago = await this.pagosService.findOnebyCaso(id);
    console.log(pago);
    if (!pago) {
      const obj = {
        monto: 0,
        fecha_pago: new Date(),
        descripcion: 'Iniciando monto total',
        metodo_pago: 'ninguno',
        monto_total,
        saldo_restante: monto_total,
        estado: 'pendiente',
        caso: {
          connect: { id },
        },
      };
      return this.pagosService.create(obj);
    }
    let id_pago = pago.id;
    return this.pagosService.update(id_pago, { monto_total });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data) {
    return this.pagosService.update(id, data);
  }
}
