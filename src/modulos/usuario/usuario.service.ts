import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);
    return this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!checkEmail) throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) throw new NotFoundException('O usuario não foi encontrado.');

    Object.assign(usuario, novosDados as UsuarioEntity);

    return this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }
}
