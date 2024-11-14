import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditatransacaoPage } from './editatransacao.page';

const routes: Routes = [
  {
    path: '',
    component: EditatransacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditatransacaoPageRoutingModule {}
