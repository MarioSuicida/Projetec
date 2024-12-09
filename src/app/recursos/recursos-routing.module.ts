import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecursosPage } from './recursos.page';

const routes: Routes = [
  {
    path: '',
    component: RecursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecursosPageRoutingModule {}
