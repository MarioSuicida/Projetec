import { Component, ViewChild } from '@angular/core';
import { IonInput, NavController, ToastController } from '@ionic/angular';
import { usuariosService, planejamento_mensal } from '../clientes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salvaplanejamento',
  templateUrl: './salvaplanejamento.page.html',
  styleUrls: ['./salvaplanejamento.page.scss'],
})
export class SalvaplanejamentoPage {
  @ViewChild('metaInput', { static: false }) metaInput!: IonInput; 

  planejamento: planejamento_mensal = {
    ID: this.gerarId(),
    ID_usuario: '',
    meta_de_despesas: '',
    gastos: '',
    categoria: '',
    mes: '',
    ano: '',
    recorrente: '',
    novaCategoriaGasto: undefined,
    categoriaGasto: undefined,
    data: undefined
  };

  mostrarCampoCategoriaGasto: boolean = false;
  novaCategoriaGasto: string = '';
  gastosDisponiveis: { valor: any; categoria: any }[] = [];
  gastosSelecionados: string[] = [];
  dataSelecionada: string = '';  // Variável temporária para capturar o valor do ion-datetime

  categoriasGastos: string[] = ['alimentacao', 'transporte', 'saude', 'lazer', 'entretenimento', 'educação'];
  categoriaSelecionada: string = '';
  gastosFiltrados: { valor: any; categoria: any }[] = [];

  categorias: string[] = ['Alimentação', 'Transporte', 'Saúde', 'Lazer'];

  constructor(
    private navCtrl: NavController, 
    private usuarioService: usuariosService, 
    private toastController: ToastController
  ) {}

  ionViewDidEnter() {
    this.metaInput.setFocus(); // Foca no campo de entrada ao abrir a página
  }


  selecionarCategoriaGasto(categoria: string) {
    this.categoriaSelecionada = categoria;
  
    if (categoria === 'outros') {
      this.carregarCategoriasPersonalizadas(); // Chama a função para carregar categorias personalizadas
    } else {
      this.filtrarGastosPorCategoria(categoria);
    }
  }

  carregarCategoriasPersonalizadas() {
    this.usuarioService.listar('transacao').subscribe(
      (gastos) => {
        // Filtrar para obter apenas as transações do tipo "gasto" e que não estão nas categorias predefinidas
        const categoriasFiltradas = gastos
          .filter((gasto: any) => 
            gasto.tipo === 'gasto' && !this.categoriasGastos.includes(gasto.categoria)
          )
          .map((gasto: any) => ({ valor: gasto.valor, categoria: gasto.categoria }));
  
        this.gastosFiltrados = categoriasFiltradas; // Atualiza a lista de gastos filtrados
        this.gastosSelecionados = []; // Reseta os gastos selecionados
      },
      (error: any) => {
        console.error('Erro ao carregar categorias personalizadas:', error);
      }
    );
  }
  
  
  
  // Adicione esta função para filtrar os gastos
  filtrarGastosPorCategoria(categoria: string) {
    this.gastosFiltrados = this.gastosDisponiveis.filter(gasto => gasto.categoria === categoria);
    this.gastosSelecionados = []; // Resetar os gastos selecionados ao mudar de categoria
  }


  selecionarCategoria(categoria: string) {
    this.planejamento.categoria = categoria;
    this.mostrarCampoCategoriaGasto = categoria === 'outras';
  }

  selecionarRecorrente(valor: string) {
    this.planejamento.recorrente = valor;
  }

  toggleGasto(valor: string) {
    const index = this.gastosSelecionados.indexOf(valor);
    if (index > -1) {
      // Se o gasto já estiver selecionado, remove-o
      this.gastosSelecionados.splice(index, 1);
    } else {
      // Se o gasto não estiver selecionado, adiciona-o
      this.gastosSelecionados.push(valor);
    }
  }
  

  ionViewWillEnter() {
    const usuarioLogado = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuarioLogado && usuarioLogado.ID) {
      this.planejamento.ID_usuario = usuarioLogado.ID;
    } else {
      console.error('Usuário não encontrado no localStorage');
      this.navCtrl.navigateBack('login');
    }

    this.carregarGastos();
  }

  gerarId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  voltar() {
    this.navCtrl.navigateBack('/planejamento');
  }

  categoriaMudou(event: any) {
    if (event.detail.value === 'outras') {
      this.mostrarCampoCategoriaGasto = true;
    } else {
      this.mostrarCampoCategoriaGasto = false;
    }
  }

  carregarGastos() {
    this.usuarioService.listar('transacao').subscribe(
      (gastos) => {
        this.gastosDisponiveis = gastos
          .filter((gasto: any) => gasto.tipo === 'gasto')
          .map((gasto: any) => ({ valor: gasto.valor, categoria: gasto.categoria }));
      },
      (error: any) => {
        console.error('Erro ao carregar gastos:', error);
      }
    );
  }

  // Função que extrai o mês e o ano do evento de mudança de data
  dataMudou(event: any) {
    const dataSelecionada = new Date(event.detail.value);
    this.planejamento.mes = (dataSelecionada.getMonth() + 1).toString(); // Mês (adiciona 1 pois é zero-indexado)
    this.planejamento.ano = dataSelecionada.getFullYear().toString();    // Ano
  }

  enviar(form: NgForm) {
    console.log('Valores do formulário:', form.value);
  
    if (form.invalid) {
      this.mostrarMensagemErro('Formulário inválido. Verifique os campos.');
      return;
    }
  
    if (!this.planejamento.ID_usuario) {
      this.mostrarMensagemErro('ID do usuário não encontrado, não é possível salvar o planejamento.');
      return;
    }
  
    // Atualiza o objeto planejamento com os valores do formulário
    this.planejamento = { ...this.planejamento, ...form.value };
  
    // Se a categoria for 'outras', atribui o valor da nova categoria diretamente à categoria
    if (this.planejamento.categoria === 'outras') {
      if (this.novaCategoriaGasto) {
        this.planejamento.categoria = this.novaCategoriaGasto; // Atribui nova categoria diretamente
      } else {
        this.mostrarMensagemErro('Por favor, insira uma nova categoria de gasto.');
        return;
      }
    }
  
    // Soma os gastos selecionados e atribui ao planejamento.gastos
    this.planejamento.gastos = this.gastosSelecionados.reduce((total, valor) => total + Number(valor), 0).toString();
  
    // Deletar as propriedades 'data' e 'categoriaGasto' do objeto planejamento
    delete this.planejamento.data;
    delete this.planejamento.categoriaGasto;
  
    // Cria um novo objeto que exclui novaCategoriaGasto
    const { novaCategoriaGasto, ...dadosParaEnviar } = this.planejamento;
  
    console.log('Planejamento a ser salvo:', dadosParaEnviar);
  
    // Chama o serviço para salvar o planejamento no servidor
    this.usuarioService.criar('planejamento_mensal', dadosParaEnviar).subscribe(
      () => {
        console.log('Planejamento salvo com sucesso');
        this.voltar();
      },
      (error: any) => {
        this.mostrarMensagemErro('Erro ao salvar o planejamento. Tente novamente mais tarde.');
        console.error('Erro ao salvar o planejamento:', error);
      }
    );

    const planejamentosLocal = JSON.parse(localStorage.getItem('planejamentos') || '[]');
    planejamentosLocal.push(dadosParaEnviar);
    localStorage.setItem('planejamentos', JSON.stringify(planejamentosLocal));

    console.log('Planejamento salvo no LocalStorage:', dadosParaEnviar);

    this.voltar();
  }
  

  async mostrarMensagemErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000, // Duração em milissegundos
      color: 'danger', // Cor do toast
      position: 'top', // Posição do toast
    });
    toast.present();
  }


  
}
