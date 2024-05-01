import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CasosController } from "./casos.controller";
import { CasosService } from "./casos.service";

@Module({
  imports: [PrismaModule],
  controllers: [CasosController],
  providers: [CasosService],
})
export class CasosModule {}