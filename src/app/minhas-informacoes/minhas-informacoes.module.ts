import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasInformacoesPageRoutingModule } from './minhas-informacoes-routing.module';

import { MinhasInformacoesPage } from './minhas-informacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasInformacoesPageRoutingModule
  ],
  declarations: [MinhasInformacoesPage]
})
export class MinhasInformacoesPageModule {}
