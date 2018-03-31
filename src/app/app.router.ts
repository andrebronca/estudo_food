import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutoComponent }   from './produto/produto.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: AppComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'produtos', component: ProdutoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}