import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentralajudaPage } from './centralajuda.page';

const routes: Routes = [
  {
    path: '',
    component: CentralajudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentralajudaPageRoutingModule {}
