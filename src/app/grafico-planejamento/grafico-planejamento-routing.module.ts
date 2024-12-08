import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoPlanejamentoPage } from './grafico-planejamento.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoPlanejamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoPlanejamentoPageRoutingModule {}
