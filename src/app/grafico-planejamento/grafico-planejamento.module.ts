import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoPlanejamentoPageRoutingModule } from './grafico-planejamento-routing.module';

import { GraficoPlanejamentoPage } from './grafico-planejamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoPlanejamentoPageRoutingModule
  ],
  declarations: [GraficoPlanejamentoPage]
})
export class GraficoPlanejamentoPageModule {}
