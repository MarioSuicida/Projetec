import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) {}

  // Método para navegar para a página de login
  showLogin() {
    this.navCtrl.navigateForward('login');
  }

  // Método para navegar para a página de registro
  showRegistro() {
    this.navCtrl.navigateForward('registro');
  }

  // Método que é chamado quando o componente é inicializado
  ngOnInit() {
  }

}

