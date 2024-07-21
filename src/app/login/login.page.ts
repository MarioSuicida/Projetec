import { Component } from '@angular/core'; // Importa o decorador Component para criar um componente Angular.
import { NgForm } from '@angular/forms'; // Importa NgForm para manipulação de formulários em Angular.
import { NavController } from '@ionic/angular'; // Importa NavController para navegação entre páginas.
import { usuariosService, usuarios } from 'src/app/clientes.service'; // Importa o serviço de usuários e a interface de usuários.

@Component({
  selector: 'app-login', // Define o seletor do componente, usado no template HTML.
  templateUrl: './login.page.html', // Caminho para o template HTML do componente.
  styleUrls: ['./login.page.scss'], // Caminho para o arquivo de estilos (CSS/SCSS) do componente.
})
export class LoginPage {
  mensagemLogin: string = ''; // Armazena a mensagem de sucesso do login.
  mensagemErro: string = ''; // Armazena a mensagem de erro em caso de falha no login.

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
    if (form.valid) { // Verifica se o formulário é válido.
      const { email, senha } = form.value; // Extrai email e senha dos valores do formulário.

      // Chama o serviço de login com o email e senha fornecidos.
      this.service.login(email, senha).subscribe(
        (usuario: usuarios[]) => { // Subscrição ao observable retornado pelo serviço de login.
          if (usuario && usuario.length > 0) { // Verifica se o login foi bem-sucedido.
            this.mensagemLogin = 'Login bem-sucedido'; // Define a mensagem de sucesso.
            this.mensagemErro = ''; // Limpa a mensagem de erro, se houver.

            const loggedUser = usuario[0]; // Obtém o primeiro usuário retornado pela API.
            localStorage.setItem('user', JSON.stringify(loggedUser)); // Armazena o usuário no localStorage.

            this.navCtrl.navigateForward('/tela-principal'); // Navega para a página principal após o login.
          } else {
            this.mensagemErro = 'Credenciais inválidas'; // Define a mensagem de erro para credenciais inválidas.
            this.mensagemLogin = ''; // Limpa a mensagem de sucesso, se houver.
          }
        },
        (error) => { // Manipula erros que ocorrem durante a chamada ao serviço de login.
          this.mensagemErro = 'Erro ao fazer login'; // Define a mensagem de erro para falhas na API.
          this.mensagemLogin = ''; // Limpa a mensagem de sucesso, se houver.
        }
      );
    } else {
      this.mensagemErro = 'Formulário inválido'; // Define a mensagem de erro se o formulário for inválido.
      this.mensagemLogin = ''; // Limpa a mensagem de sucesso, se houver.
    }
  }
}


