import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProdutosListaComponent } from './produtos-lista.component';

@NgModule({
  declarations: [
    ProdutosListaComponent
  ],
  exports: [
    ProdutosListaComponent
  ]
})
export class ProdutosModule {

}
