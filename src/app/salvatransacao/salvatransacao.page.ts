import { Component, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';
import { usuariosService, transacao } from '../clientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salvatransacao',
  templateUrl: './salvatransacao.page.html',
  styleUrls: ['./salvatransacao.page.scss'],
})
export class SalvatransacaoPage {
  @ViewChild('valorInput', { static: false }) valorInput!: IonInput; // Referência ao campo de entrada

  transacao: transacao = {
    ID: this.gerarId(),
    ID_usuario: '',
    valor: '',
    tipo: '',
    recorrente: '',
    categoria: '',
    mes: '',
    ano: '',
    dia: '',
    categoriaGasto: undefined,
    categoriaRenda: undefined,
    novaCategoriaGasto: undefined,
    novaCategoriaRenda: undefined
  };

  mostrarCampoCategoriaRenda: boolean = false;
  mostrarCampoCategoriaGasto: boolean = false;
  novaCategoriaRenda: string = '';
  novaCategoriaGasto: string = '';

  tipos: string[] = ['renda', 'gasto'];
  categoriasRenda: string[] = ['salario', 'freelance', 'investimentos', 'dividendos', 'vendas', 'aluguel'];
  categoriasGasto: string[] = ['alimentacao', 'transporte', 'saude', 'lazer', 'entretenimento', 'educação'];

  constructor(private navCtrl: NavController, private usuarioService: usuariosService) {}

  ionViewDidEnter() {
    this.valorInput.setFocus(); // Foca no campo de entrada ao abrir a página
  }

  ionViewWillEnter() {
    const usuarioLogado = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuarioLogado && usuarioLogado.ID) {
      this.transacao.ID_usuario = usuarioLogado.ID;
    } else {
      console.error('Usuário não encontrado no localStorage');
      this.navCtrl.navigateBack('login');
    }
  }

  gerarId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  voltar() {
    this.navCtrl.navigateBack('/renda');
  }

  selecionarTipo(tipo: string) {
    this.transacao.tipo = tipo;
    this.tipoMudou();
  }

  tipoMudou() {
    this.transacao.categoria = '';
    this.novaCategoriaRenda = '';
    this.novaCategoriaGasto = '';
    this.mostrarCampoCategoriaRenda = false;
    this.mostrarCampoCategoriaGasto = false;
  }

  selecionarCategoriaRenda(categoria: string) {
    this.transacao.categoria = categoria;
    this.mostrarCampoCategoriaRenda = categoria === 'outras';
  }

  selecionarCategoriaGasto(categoria: string) {
    this.transacao.categoria = categoria;
    this.mostrarCampoCategoriaGasto = categoria === 'outros';
  }

  salvarCategoriaRenda() {
    if (this.novaCategoriaRenda) {
      localStorage.setItem('categoriaRenda', this.novaCategoriaRenda); // Salva a nova categoria
      this.transacao.categoria = this.novaCategoriaRenda; // Atribui a nova categoria à transação
      this.mostrarCampoCategoriaRenda = false; // Fecha o campo de entrada
    }
  }

  salvarCategoriaGasto() {
    if (this.novaCategoriaGasto) {
      localStorage.setItem('categoriaGasto', this.novaCategoriaGasto); // Salva a nova categoria
      this.transacao.categoria = this.novaCategoriaGasto; // Atribui a nova categoria à transação
      this.mostrarCampoCategoriaGasto = false; // Fecha o campo de entrada
    }
  }

  selecionarRecorrente(valor: string) {
    this.transacao.recorrente = valor;
  }  

  enviar(form: NgForm) {
    console.log('Valores do formulário:', form.value);
  
    if (form.invalid) {
      console.error('Formulário inválido. Verifique os campos.', form.value);
      return;
    }
  
    if (!this.transacao.ID_usuario) {
      console.error('ID do usuário não encontrado, não é possível salvar a transação.');
      return;
    }
  
    // Extraindo dia, mês e ano da data escolhida
    const dataEscolhida = new Date(this.transacao['data']);
    this.transacao.dia = dataEscolhida.getDate().toString();
    this.transacao.mes = (dataEscolhida.getMonth() + 1).toString(); // Meses em JavaScript começam do zero
    this.transacao.ano = dataEscolhida.getFullYear().toString();
  
    // Preenche os dados da transação a partir do formulário
    this.transacao = { ...this.transacao, ...form.value };
  
    // Lógica existente para categorias "outras" e "outros"
    if (this.transacao.categoria === 'outras' && this.novaCategoriaRenda) {
      this.transacao.categoria = this.novaCategoriaRenda;
    } else if (this.transacao.categoria === 'outros' && this.novaCategoriaGasto) {
      this.transacao.categoria = this.novaCategoriaGasto;
    }
  
    delete this.transacao.categoriaGasto;
    delete this.transacao.categoriaRenda;
    delete this.transacao.novaCategoriaRenda;
    delete this.transacao.novaCategoriaGasto;
    delete this.transacao['data'];
    console.log('Transação a ser salva:', this.transacao);
  
    this.usuarioService.criar<transacao>('transacao', this.transacao).subscribe(
      () => {
        console.log('Transação salva com sucesso');
        this.voltar();
      },
      (error) => {
        console.error('Erro ao salvar a transação:', error);
      }
    );
  }
}
