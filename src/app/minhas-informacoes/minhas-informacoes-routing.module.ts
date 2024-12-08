import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasInformacoesPage } from './minhas-informacoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasInformacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasInformacoesPageRoutingModule {}
