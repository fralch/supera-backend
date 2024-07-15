import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { CasosService } from './casos.service';
import { Casos } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    const filename = path.parse(file.originalname).name.replace(/\s/g, '');
    const filepath = path.join('./uploads', filename + ext);
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        // El archivo no existe, crear uno nuevo
        cb(null, filename + ext);
      } else {
        // El archivo existe, sobrescribirlo
        fs.unlink(filepath, (err) => {
          if (err) {
            console.error(err);
            cb(err);
          } else {
            cb(null, filename + ext);
          }
        });
      }
    });
  },
});

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

  // upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('foto', { storage }))
  async uploadFile(@Body() data) {
    return this.casosService.uploadFile(data.id, { file: data.file.filename });
  }

  // download
  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    fileStream.pipe(res);
  }
}
