import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { CasosModule } from './casos/casos.module';
import { PagosModule } from './pagos/pagos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [UsuarioModule, CasosModule, PagosModule, ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
