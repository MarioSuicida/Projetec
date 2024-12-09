import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendaPage } from './renda.page';

const routes: Routes = [
  {
    path: '',
    component: RendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendaPageRoutingModule {}
