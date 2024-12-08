import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaPrincipalPageRoutingModule } from './tela-principal-routing.module';

import { TelaPrincipalPage } from './tela-principal.page';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaPrincipalPageRoutingModule,
  

  ],
  declarations: [TelaPrincipalPage],
  
})
export class TelaPrincipalPageModule {}
