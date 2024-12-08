import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { usuariosService} from "src/app/clientes.service";
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(private service:usuariosService,private modalCtrl: ModalController) {
    
   }

  ngOnInit() {
    
    //this.Excluir("usuarios", "ID", "32")
    //this.Pesquisar("usuarios", "ID", "31")
    //{ID: '31', primeiro_nome: 'okadoçdk', segundo_nome: 'okdsakçsk', email: 'kodkdkdksdksdk@gmail.com', senha: 'jiidasdljdalkds'}
    //this.atualizar("usuarios", "ID", "31", { primeiro_nome: 'test', segundo_nome: 'testado', email: 'testando@gmail.com', senha: 'testes'})
  } 
  Pesquisar(tabela: string, coluna: string, valor: string){
    this.service.getAll(tabela, coluna, valor).subscribe(response => {
      console.log(response);
    })}
  Excluir(tabela: string, coluna: string, valor: string){
    this.service.Remover(tabela, coluna, valor).subscribe(() => {
      this.service.getAll(tabela, coluna, valor).subscribe(response => {
        console.log(response);
      })
    })}
  atualizar(tabela: string, coluna: string, valor: string, dados: any) {
      this.service.atualizar(tabela, coluna, valor, dados).subscribe(() => {
        this.service.getAll(tabela, coluna, valor).subscribe(response => {
          console.log(response);
        })
      });
    }
  }
  
  
  
  
  

