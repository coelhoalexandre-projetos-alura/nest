import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
  exports: [UsuarioService],
})
export class UsuarioModule {}
