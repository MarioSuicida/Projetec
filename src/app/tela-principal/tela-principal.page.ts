import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.page.html',
  styleUrls: ['./tela-principal.page.scss'],
})
export class TelaPrincipalPage implements OnInit {

  user: any;



  meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  indiceMesAtual: number = new Date().getMonth();

  constructor(private menuCtrl: MenuController ,
    private navCtrl: NavController,
  ) {}

  get mudancasMes(): string {
    return this.meses[this.indiceMesAtual];
  }

  anteriorMes() {
    this.indiceMesAtual = (this.indiceMesAtual - 1 + this.meses.length) % this.meses.length;
  }

  proximoMes() {
    this.indiceMesAtual = (this.indiceMesAtual + 1) % this.meses.length;
  }





  openConfigMenu() {
    this.menuCtrl.open('config-menu');
    
  }



  fechaMenuConf(){
    this.menuCtrl.close('config-menu');
    this.navCtrl.navigateBack('/tela-principal');

  }


  /////////////////////////NAV CONTROLER/////////////

  showRecursos(){
    this.navCtrl.navigateForward('/recursos')
  }

  showRenda(){
    this.navCtrl.navigateForward('/renda')

  }

  showPerfil(){
    this.navCtrl.navigateForward('/perfil')
  }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Usuário carregado:', this.user); // Verifique no console se o usuário está correto
    } else {
      console.log('Nenhum usuário encontrado no localStorage');
    }
  }

  

}


