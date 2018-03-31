import { Component, OnInit } from '@angular/core';

import { ProdutoService } from './produto.service';
import { Produto } from './produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[];

  produtoSelecionado: Produto;
  
  constructor(
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(){
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  onSelect(produto: Produto): void {
    this.produtoSelecionado = produto;
  }

}
