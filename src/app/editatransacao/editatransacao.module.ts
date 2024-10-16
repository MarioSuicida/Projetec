import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditatransacaoPageRoutingModule } from './editatransacao-routing.module';

import { EditatransacaoPage } from './editatransacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditatransacaoPageRoutingModule
  ],
  declarations: [EditatransacaoPage]
})
export class EditatransacaoPageModule {}
