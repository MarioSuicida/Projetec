import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalvaplanejamentoPageRoutingModule } from './salvaplanejamento-routing.module';

import { SalvaplanejamentoPage } from './salvaplanejamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalvaplanejamentoPageRoutingModule
  ],
  declarations: [SalvaplanejamentoPage]
})
export class SalvaplanejamentoPageModule {}
