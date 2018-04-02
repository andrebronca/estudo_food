import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProdutosListaComponent } from './produtos-lista.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProdutosListaComponent
  ],
  exports: [
    ProdutosListaComponent
  ]
})
export class ProdutosModule {

}
