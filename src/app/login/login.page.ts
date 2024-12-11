import { Component } from '@angular/core'; // Importa o decorador Component para criar um componente Angular.
import { NgForm } from '@angular/forms'; // Importa NgForm para manipulação de formulários em Angular.
import { NavController } from '@ionic/angular'; // Importa NavController para navegação entre páginas.
import { usuariosService, usuarios } from 'src/app/clientes.service'; // Importa o serviço de usuários e a interface de usuários.

@Component({
  selector: 'app-login', 
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  mensagemLogin: string = '';
  mensagemErro: string = ''; 

  constructor(
    private navCtrl: NavController, // Injeta o serviço de navegação para permitir a navegação entre páginas.
    private service: usuariosService // Injeta o serviço de usuários para fazer chamadas à API de login.
  ) {}

  // Método chamado ao clicar no link para registrar um novo usuário.
  showRegistro() {
    this.navCtrl.navigateForward('registro'); // Navega para a página de registro.
  }

  // Método chamado ao submeter o formulário de login.
  onLogin(form: NgForm) {
    if (form.valid) {
       const { email, senha } = form.value;
 
       this.service.login(email, senha).subscribe(
          (usuarios: usuarios[]) => {
             // Filtra o usuário que corresponde ao email e senha fornecidos
             const loggedUser = usuarios.find(user => user.email === email && user.senha === senha);  
             
             if (loggedUser) {
                this.mensagemLogin = 'Login bem-sucedido';
                this.mensagemErro = '';
                
                localStorage.setItem('user', JSON.stringify(loggedUser));
                this.navCtrl.navigateForward('/tela-principal');
             } else {
                this.mensagemErro = 'email ou senha inválidos';
                this.mensagemLogin = '';
             }
          },
          (error) => {
             this.mensagemErro = 'Erro ao fazer login';
             this.mensagemLogin = '';
          }
       );
    } else {
       this.mensagemErro = 'Preencha seus dados ! ';
       this.mensagemLogin = '';
    }
 }
 
}


