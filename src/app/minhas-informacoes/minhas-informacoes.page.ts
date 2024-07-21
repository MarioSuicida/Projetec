import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { usuariosService, usuarios, UsuarioUpdate } from 'src/app/clientes.service';

@Component({
  selector: 'app-minhas-informacoes',
  templateUrl: './minhas-informacoes.page.html',
  styleUrls: ['./minhas-informacoes.page.scss'],
})
export class MinhasInformacoesPage implements OnInit {
  userEmail: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  userId: string = '';

  constructor(private navCtrl: NavController, private usuariosService: usuariosService) {}

  showMinhasInfo() {
    this.navCtrl.navigateForward('tela-principal');
  }

  ngOnInit() {
  
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userEmail = user.email; 
      this.userFirstName = user.primeiro_nome; 
      this.userLastName = user.segundo_nome;
      this.userId = user.ID; 
    }
  }

  onSubmit() {
    // Atualiza as informações do usuário
    const updateUser: UsuarioUpdate = {
      ID: this.userId,
      primeiro_nome: this.userFirstName,
      segundo_nome: this.userLastName,
      email: this.userEmail,
    };

    this.usuariosService.atualizar<UsuarioUpdate>('usuarios', 'ID', this.userId, updateUser).subscribe(
      (response) => {
        console.log('Informações atualizadas com sucesso:', response);
        // Atualiza o localStorage com as novas informações
        localStorage.setItem('user', JSON.stringify(updateUser));

        this.navCtrl.navigateForward('/tela-principal') .then(() => {
          window.location.reload();
      });
    },
      (error: any) => {
        console.error('Erro ao atualizar informações:', error);
      }
    );
  }

}







