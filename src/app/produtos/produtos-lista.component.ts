import { Component, OnInit } from "@angular/core";

import { Produto } from './produto.model';
import { ProdutoService } from "./produto.service";

@Component({
  moduleId: module.id,
  selector: 'app-produtos-lista',
  templateUrl: 'produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {

  produtos: Produto[];

  constructor(private produtoService: ProdutoService){

  }

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
  }


}
