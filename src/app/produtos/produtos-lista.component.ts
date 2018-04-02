import { Component } from "@angular/core";

import { Produto } from './produto.model';
import { PRODUTOS } from './produtos-mock';

@Component({
  moduleId: module.id,
  selector: 'app-produtos-lista',
  templateUrl: 'produtos-lista.component.html'
})
export class ProdutosListaComponent {

  produtos: Produto[] = PRODUTOS;
}
