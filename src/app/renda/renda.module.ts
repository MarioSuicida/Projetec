import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RendaPageRoutingModule } from './renda-routing.module';

import { RendaPage } from './renda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RendaPageRoutingModule
  ],
  declarations: [RendaPage]
})
export class RendaPageModule {}
