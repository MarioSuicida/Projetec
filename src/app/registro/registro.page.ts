import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { usuariosService } from '../clientes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  mensagemErro: string = ''; // Variável para armazenar a mensagem de erro.

  constructor(
    private navCtrl: NavController,
    private service: usuariosService
  ) {}

  // Método para navegar para a página de login.
  showLogin() {
    this.navCtrl.navigateForward('login');
  }

  // Método chamado ao submeter o formulário de registro.
  enviando(form: NgForm) {
    // Verifica se o formulário é válido
    if (!form.valid) {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
      setTimeout(() => {
        this.mensagemErro = ''; // Limpa a mensagem após 4 segundos
      }, 4000);
      return;
    }
  
    const dadosUsuario = form.value;
  
    // Verifica se algum campo obrigatório está vazio
    for (const key in dadosUsuario) {
      if (!dadosUsuario[key]) {
        this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios.';
        setTimeout(() => {
          this.mensagemErro = ''; // Limpa a mensagem após 10 segundos
        }, 10000);
        return;
      }
    }
  
    // Tenta criar o novo usuário
    this.service.criar('usuarios', dadosUsuario).subscribe(
      response => {
        console.log('Novo usuário criado:', response);
  
        // Realiza o login automático após o cadastro para redirecionar o usuário.
        this.service.login(dadosUsuario.email, dadosUsuario.senha).subscribe(
          (usuarios: any[]) => {
            const loggedUser = usuarios.find(
              user => user.email === dadosUsuario.email && user.senha === dadosUsuario.senha
            );
  
            if (loggedUser) {
              localStorage.setItem('user', JSON.stringify(loggedUser)); 
              this.navCtrl.navigateForward('/tela-principal');
            } else {
              console.error('Falha ao identificar o usuário após o cadastro');
            }
          },
          (error) => {
            console.error('Erro ao fazer login após o cadastro', error);
          }
        );
      },
      (error) => {
        console.log('Erro de cadastro:', error);
        
        // Verifica se o erro é devido ao e-mail já estar em uso
        if (error.status === 400 || error.status === 409) {
          if (error.error && error.error.message && error.error.message.includes('email')) {
            this.mensagemErro = 'Este e-mail já está em uso. Tente outro. Faça login'; 
          } else {
            this.mensagemErro = 'Erro ao tentar criar o usuário. Tente novamente mais tarde.';
          }
        } else {
          this.mensagemErro = 'Email já cadastrado ! Tente o Login !';
        }
  
        // Exibe a mensagem de erro por 4 segundos
        setTimeout(() => {
          this.mensagemErro = '';
        }, 4000);
      }
    );
  }
  
  
}
