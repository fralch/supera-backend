import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import {CasosModule} from './casos/casos.module';

@Module({
  imports: [UsuarioModule,CasosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
