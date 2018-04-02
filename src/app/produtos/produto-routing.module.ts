import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosListaComponent } from './produtos-lista.component';
import { ProdutoDetalheComponent } from './produto-detalhe.component';

const produtoRoutes: Routes = [
  {path: 'produtos', component: ProdutosListaComponent},
  {path: 'produto/save', component: ProdutoDetalheComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild( produtoRoutes )
  ]
})
export class ProdutoRoutingModule {

}
