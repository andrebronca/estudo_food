import { Injectable } from '@angular/core';

import { Produto } from './produto.model';
import { PRODUTOS } from './produtos-mock';

@Injectable()
export class ProdutoService {


  getProdutos(): Produto[] {
    return PRODUTOS;
  }
}
