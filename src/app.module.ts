import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import {CasosModule} from './casos/casos.module';
import { PagosModule } from './pagos/pagos.module';


@Module({
  imports: [UsuarioModule,CasosModule, PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
