import { Component, OnInit } from '@angular/core'; // Importa o decorator Component e a interface OnInit
import { FormBuilder, FormGroup } from '@angular/forms'; // Importa FormBuilder e FormGroup para trabalhar com formulários reativos
import { usuariosService } from 'src/app/clientes.service'; // Importa o serviço de usuários
import { Router } from '@angular/router'; // Importa o Router para navegação
import { NavController } from '@ionic/angular'; // Importa NavController para navegação em Ionic

@Component({
  selector: 'app-perfil', // Define o seletor do componente
  templateUrl: './perfil.page.html', // Define o template HTML do componente
  styleUrls: ['./perfil.page.scss'], // Define os estilos SCSS do componente
})
export class PerfilPage implements OnInit { 
  user: any; // Variável para armazenar as informações do usuário
  mostrarDialogo: boolean = false;

  mostrarAlerta: boolean = false;

  constructor(
    private navCtrl: NavController, // Injeta o NavController para navegação
    private formBuilder: FormBuilder, // Injeta o FormBuilder para criar formulários
    private userService: usuariosService, // Injeta o serviço de usuários para chamadas de API
    private router: Router // Injeta o Router para navegação programática
  ) { }
  
  // Método para navegar para a página de informações do usuário
  showMinhasInfo() {
    this.navCtrl.navigateForward('minhas-informacoes');
  }

  fecharAlerta() {
    this.mostrarAlerta = false; // Define a variável para ocultar o alerta
  }
  

  mostrarDialogoEncerrarSessao() {
    this.mostrarDialogo = true;
  }

  // Fecha o diálogo sem fazer logout
  fecharDialogo() {
    this.mostrarDialogo = false;
  }

  // Realiza o logout e redireciona para a página inicial
  confirmarEncerrarSessao() {
    localStorage.removeItem('user');
    this.mostrarDialogo = false;
    this.navCtrl.navigateRoot('/home');
  }

  

  // Método do ciclo de vida do componente que é chamado quando o componente é inicializado
  ngOnInit() {
    // Recupera as informações do usuário armazenadas no localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData); // Converte o string JSON de volta para um objeto
      console.log('Usuário carregado:', this.user); // Exibe as informações do usuário no console
    } else {
      console.log('Nenhum usuário encontrado no localStorage'); // Mensagem no console se não houver dados de usuário
    }
  }

  // Método para lidar com o envio de formulários (ainda não implementado)
  onSubmit() {
   
  }
}

