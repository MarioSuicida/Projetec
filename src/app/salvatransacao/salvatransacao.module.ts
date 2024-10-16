import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalvatransacaoPageRoutingModule } from './salvatransacao-routing.module';

import { SalvatransacaoPage } from './salvatransacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalvatransacaoPageRoutingModule
  ],
  declarations: [SalvatransacaoPage]
})
export class SalvatransacaoPageModule {}
