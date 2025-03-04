import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
