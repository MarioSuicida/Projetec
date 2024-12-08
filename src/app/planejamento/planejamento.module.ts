import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanejamentoPageRoutingModule } from './planejamento-routing.module';

import { PlanejamentoPage } from './planejamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanejamentoPageRoutingModule
  ],
  declarations: [PlanejamentoPage]
})
export class PlanejamentoPageModule {}
