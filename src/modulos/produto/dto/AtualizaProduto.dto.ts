import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from '../../pedido/dto/CriaPedido.dto';

export class AtualizaProdutoDTO extends PartialType(CriaPedidoDTO) {}
