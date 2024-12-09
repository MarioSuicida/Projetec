import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaPrincipalPage } from './tela-principal.page';

const routes: Routes = [
  {
    path: '',
    component: TelaPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaPrincipalPageRoutingModule {}
