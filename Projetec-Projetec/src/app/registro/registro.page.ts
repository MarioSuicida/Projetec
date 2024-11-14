// Importa os módulos e serviços necessários.
import { Component } from '@angular/core'; // Importa o decorador Component.
import { NgForm } from '@angular/forms'; // Importa NgForm para manipular formulários.
import { NavController } from '@ionic/angular'; // Importa NavController para navegação entre páginas.
import { usuariosService } from '../clientes.service'; // Importa o serviço de usuários.

@Component({
  selector: 'app-registro', // Define o seletor do componente.
  templateUrl: './registro.page.html', // Define o arquivo de template HTML.
  styleUrls: ['./registro.page.scss'], // Define o arquivo de estilos CSS.
})
export class RegistroPage {

  // O construtor injeta NavController e usuariosService.
  constructor(
    private navCtrl: NavController, // Usado para navegação entre páginas.
    private service: usuariosService // Usado para interagir com a API de usuários.
  ) {}

  // Método para navegar para a página de login.
  showLogin() {
    this.navCtrl.navigateForward('login'); // Navega para a página de login.
  }

  // Método chamado ao submeter o formulário de registro.
  enviando(form: NgForm) {
    const dadosUsuario = form.value; // Obtém os dados do formulário.

    // Cria um novo usuário na API.
    this.service.criar('usuarios', dadosUsuario).subscribe(response => {
      console.log('Novo usuário criado:', response); // Loga a resposta da criação do usuário.

      // Realiza o login automático após o cadastro para redirecionar o usuário.
      this.service.login(dadosUsuario.email, dadosUsuario.senha).subscribe(
        (usuario: any[]) => { // Resposta da tentativa de login.
          if (usuario && usuario.length > 0) {
            const loggedUser = usuario[0]; // Obtém o primeiro usuário retornado.
            localStorage.setItem('user', JSON.stringify(loggedUser)); // Salva os dados do usuário no localStorage.
            this.navCtrl.navigateForward('/tela-principal'); // Navega para a página principal.
          } else {
            console.error('Falha ao fazer login após o cadastro'); // Loga um erro se o login falhar.
          }
        },
        (error) => {
          console.error('Erro ao fazer login após o cadastro', error); // Loga qualquer erro ocorrido durante o login.
        }
      );
    });
  }
}


