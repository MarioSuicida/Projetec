import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalvaplanejamentoPage } from './salvaplanejamento.page';

const routes: Routes = [
  {
    path: '',
    component: SalvaplanejamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalvaplanejamentoPageRoutingModule {}
