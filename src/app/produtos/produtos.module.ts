import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProdutosListaComponent } from './produtos-lista.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoDetalheComponent } from './produto-detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutoRoutingModule
  ],
  declarations: [
    ProdutosListaComponent,
    ProdutoDetalheComponent
  ],
  exports: [
    ProdutosListaComponent
  ]
})
export class ProdutosModule {

}
