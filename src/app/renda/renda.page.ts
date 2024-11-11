import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { usuariosService, transacao } from '../clientes.service';

@Component({
  selector: 'app-renda',
  templateUrl: './renda.page.html',
  styleUrls: ['./renda.page.scss'],
})
export class RendaPage implements OnInit {
  transacoes: transacao[] = [];
  meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  indiceMesAtual: number = new Date().getMonth();
  anoAtual: number = new Date().getFullYear();

  constructor(private navCtrl: NavController, private usuariosService: usuariosService) {}

  ngOnInit() {
    this.carregarTransacoes();
  }

  ionViewWillEnter() {
    // Recarrega as transações toda vez que a página for aberta
    this.carregarTransacoes();
  }

  editarTransacao(transacao: transacao) {
    this.navCtrl.navigateForward(`/editatransacao`, {
      queryParams: { transacao: JSON.stringify(transacao) }
    });
  }
  

  get mudancasMes(): string {
    return this.meses[this.indiceMesAtual];
  }

  anteriorMes() {
    this.indiceMesAtual = (this.indiceMesAtual - 1 + this.meses.length) % this.meses.length;
    this.carregarTransacoes(); 
  }

  proximoMes() {
    this.indiceMesAtual = (this.indiceMesAtual + 1) % this.meses.length;
    this.carregarTransacoes(); 
  }

  carregarTransacoes() {
    const mesAtual = (this.indiceMesAtual + 1).toString().padStart(2, '0'); 
    this.usuariosService.getAll<transacao>('transacao', 'mes', mesAtual).subscribe(
      (response) => {
        this.transacoes = response;
        console.log(`Transações carregadas para ${this.mudancasMes}:`, this.transacoes);
      },
      (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    );
  }

  excluirTransacao(ID: string) {
    this.usuariosService.Remover<transacao>('transacao', 'ID', ID).subscribe(
      () => {
        this.carregarTransacoes();
        console.log('Transação excluída com sucesso');
      },
      (error) => {
        console.error('Erro ao excluir transação:', error);
      }
    );
  }

  irParaSalvarTransacao() {
    this.navCtrl.navigateForward('/salvatransacao');
  }
}


