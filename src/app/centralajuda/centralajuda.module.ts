import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentralajudaPageRoutingModule } from './centralajuda-routing.module';

import { CentralajudaPage } from './centralajuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentralajudaPageRoutingModule
  ],
  declarations: [CentralajudaPage]
})
export class CentralajudaPageModule {}
