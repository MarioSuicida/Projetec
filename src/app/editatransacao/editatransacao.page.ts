import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { usuariosService, transacao } from '../clientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editatransacao',
  templateUrl: './editatransacao.page.html',
  styleUrls: ['./editatransacao.page.scss'],
})
export class EditatransacaoPage implements OnInit {
 
  @ViewChild('valorInput', { static: false }) valorInput!: IonInput; // Referência ao campo de entrada

  transacao!: transacao;
  tipos: string[] = ['renda', 'gasto'];
  categoriasRenda: string[] = ['salário', 'freelance', 'investimentos', 'dividendos', 'vendas', 'aluguel'];
  categoriasGasto: string[] = ['alimentação', 'transporte', 'saúde', 'lazer', 'entretenimento', 'educação'];
  mostrarCampoCategoriaRenda: boolean = false;
  mostrarCampoCategoriaGasto: boolean = false;
  novaCategoriaRenda: string = '';
  novaCategoriaGasto: string = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private usuarioService: usuariosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transacao = JSON.parse(params['transacao']);
      
      // Formatar a data no formato DD/MM/YYYY ao carregar a transação
      if (this.transacao.dia && this.transacao.mes && this.transacao.ano) {
        const dia = this.transacao.dia.padStart(2, '0');  // Garante dois dígitos no dia
        const mes = this.transacao.mes.padStart(2, '0');  // Garante dois dígitos no mês
        const ano = this.transacao.ano;
  
        // Formata a data como YYYY-MM-DD para o ion-datetime
        this.transacao['data'] = `${ano}-${mes}-${dia}`;
      }
    });
  }

  ionViewDidEnter() {
    this.valorInput.setFocus(); // Foca no campo de entrada ao abrir a página
  }

// Adicione esta função para selecionar recorrente
selecionarRecorrente(valor: string) {
  this.transacao.recorrente = valor;
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
      localStorage.setItem('categoriaRenda', this.novaCategoriaRenda);
      this.transacao.categoria = this.novaCategoriaRenda;
      this.mostrarCampoCategoriaRenda = false;
    }
  }

  salvarCategoriaGasto() {
    if (this.novaCategoriaGasto) {
      localStorage.setItem('categoriaGasto', this.novaCategoriaGasto);
      this.transacao.categoria = this.novaCategoriaGasto;
      this.mostrarCampoCategoriaGasto = false;
    }
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
  
    // Extrair a data do campo do formulário e converter em dia, mês e ano
    const dataEscolhida = new Date(form.value.data);  // Usar o valor de data do formulário
    this.transacao.dia = (dataEscolhida.getDate()+1).toString();
    this.transacao.mes = (dataEscolhida.getMonth() + 1).toString();  // Meses em JavaScript começam do zero
    this.transacao.ano = dataEscolhida.getFullYear().toString();
  
    // Atualiza os outros campos da transação a partir do formulário
    this.transacao = { ...this.transacao, ...form.value };
  
    // Remover o campo `data` pois você já extraiu dia, mês e ano
    delete this.transacao['data'];
  
    this.usuarioService.atualizar<transacao>('transacao', 'ID', this.transacao.ID, this.transacao).subscribe(
      () => {
        console.log('Transação atualizada com sucesso');
        
        this.navCtrl.navigateBack('/renda');
      },
      (error) => {
        console.error('Erro ao atualizar a transação:', error);
      }
    );
  }
  
  
}
