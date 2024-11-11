import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalvatransacaoPage } from './salvatransacao.page';

const routes: Routes = [
  {
    path: '',
    component: SalvatransacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalvatransacaoPageRoutingModule {}
