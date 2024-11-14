import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaplanejamentoPageRoutingModule } from './editaplanejamento-routing.module';

import { EditaplanejamentoPage } from './editaplanejamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaplanejamentoPageRoutingModule
  ],
  declarations: [EditaplanejamentoPage]
})
export class EditaplanejamentoPageModule {}
