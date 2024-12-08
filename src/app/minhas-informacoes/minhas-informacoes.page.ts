import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { usuariosService, UsuarioUpdate } from 'src/app/clientes.service';

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

  // Variável para controlar a exibição da caixa de diálogo
  mostrarDialogo: boolean = false;

  constructor(private navCtrl: NavController, private usuariosService: usuariosService) {}

  // Método para redirecionar para a tela principal
  showMinhasInfo() {
    this.navCtrl.navigateForward('tela-principal');
  }

  // Método para exibir a caixa de diálogo
  exibirDialogo() {
    this.mostrarDialogo = true; // Exibe a caixa de diálogo
  }

  // Método para cancelar a ação
  cancelar() {
    this.mostrarDialogo = false; // Fecha a caixa de diálogo
  }

  // Método para confirmar e salvar as alterações
  confirmar() {
    this.mostrarDialogo = false; // Fecha a caixa de diálogo
    this.salvarAlteracoes(); // Chama o método para salvar as alterações
  }

  // Método que salva as alterações
  salvarAlteracoes() {
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

        this.navCtrl.navigateForward('/tela-principal').then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        console.error('Erro ao atualizar informações:', error);
      }
    );
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

  // Método de envio para salvar as alterações
  onSubmit() {
    const updateUser: UsuarioUpdate = {
      ID: this.userId,
      primeiro_nome: this.userFirstName,
      segundo_nome: this.userLastName,
      email: this.userEmail,
    };

    this.usuariosService.atualizar<UsuarioUpdate>('usuarios', 'ID', this.userId, updateUser).subscribe(
      (response) => {
        console.log('Informações atualizadas com sucesso:', response);
        localStorage.setItem('user', JSON.stringify(updateUser));

        this.navCtrl.navigateForward('/tela-principal').then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        console.error('Erro ao atualizar informações:', error);
      }
    );
  }
}
