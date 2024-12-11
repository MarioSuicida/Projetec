import { Component, ViewChild } from '@angular/core';
import { IonInput, NavController, ToastController } from '@ionic/angular';
import { usuariosService, planejamento_mensal } from '../clientes.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editaplanejamento',
  templateUrl: './editaplanejamento.page.html',
  styleUrls: ['./editaplanejamento.page.scss'],
})
export class EditaplanejamentoPage {

  @ViewChild('metaInput', { static: false }) metaInput!: IonInput; 

  minDate: string = '';

  planejamento: planejamento_mensal = {
    ID: '',
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
  dataSelecionada: string = '';

  categoriasGastos: string[] = ['alimentação', 'transporte', 'saúde', 'lazer', 'entretenimento', 'educação'];
  categoriaSelecionada: string = '';
  gastosFiltrados: { valor: any; categoria: any }[] = [];
  categorias: string[] = ['Alimentação', 'Transporte', 'Saúde', 'Lazer'];

  constructor(
    private navCtrl: NavController,
    private usuarioService: usuariosService,
    private toastController: ToastController,
    private route: ActivatedRoute // Adicionando ActivatedRoute
  ) {

     const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ionViewDidEnter() {
    this.metaInput.setFocus(); // Foca no campo de entrada ao abrir a página
  }

  ionViewWillEnter() {
    this.carregarPlanejamento();
    this.carregarGastos();
  }

  carregarPlanejamento() {
    const idPlanejamento = this.route.snapshot.paramMap.get('id');
  
    if (idPlanejamento !== null) { // Verifica se idPlanejamento não é null
      this.usuarioService.getAll<planejamento_mensal>('planejamento_mensal', 'ID', idPlanejamento).subscribe(
        (planejamento) => {
          if (planejamento.length > 0) {
            this.planejamento = planejamento[0];
            this.dataSelecionada = `${this.planejamento.ano}-${this.planejamento.mes}-01`;
            this.gastosSelecionados = this.planejamento.gastos.split(',');
          }
        },
        (error) => {
          console.error('Erro ao carregar planejamento:', error);
        }
      );
    } else {
      console.error('ID do planejamento não encontrado na URL.');
      // Você pode querer tratar esse erro de forma adequada, talvez redirecionando ou mostrando uma mensagem.
    }
  }
  
  voltar() {
    this.navCtrl.navigateBack('/planejamento'); // Navega de volta para a página anterior
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

  selecionarCategoriaGasto(categoria: string) {
    this.categoriaSelecionada = categoria;
    if (categoria === 'outros') {
      this.carregarCategoriasPersonalizadas();
    } else {
      this.filtrarGastosPorCategoria(categoria);
    }
  }

  filtrarGastosPorCategoria(categoria: string) {
    this.gastosFiltrados = this.gastosDisponiveis.filter(gasto => gasto.categoria === categoria);
    this.gastosSelecionados = []; // Resetar os gastos selecionados ao mudar de categoria
  }

  carregarCategoriasPersonalizadas() {
    this.usuarioService.listar('transacao').subscribe(
      (gastos) => {
        const categoriasFiltradas = gastos
          .filter((gasto: any) => gasto.tipo === 'gasto' && !this.categoriasGastos.includes(gasto.categoria))
          .map((gasto: any) => ({ valor: gasto.valor, categoria: gasto.categoria }));

        this.gastosFiltrados = categoriasFiltradas; // Atualiza a lista de gastos filtrados
        this.gastosSelecionados = []; // Reseta os gastos selecionados
      },
      (error: any) => {
        console.error('Erro ao carregar categorias personalizadas:', error);
      }
    );
  }

  selecionarCategoria(categoria: string) {
    if (categoria === 'outras') {
      this.mostrarCampoCategoriaGasto = true; // Mostra o campo para nova categoria
      this.planejamento.categoria = this.novaCategoriaGasto; // Atribui o valor atual de novaCategoriaGasto
    } else {
      this.planejamento.categoria = categoria; // Atribui a categoria normal
      this.mostrarCampoCategoriaGasto = false; // Esconde o campo
    }
  }
  

  selecionarRecorrente(valor: string) {
    this.planejamento.recorrente = valor;
  }

  toggleGasto(valor: string) {
    const index = this.gastosSelecionados.indexOf(valor);
    if (index > -1) {
      this.gastosSelecionados.splice(index, 1);
    } else {
      this.gastosSelecionados.push(valor);
    }
  }

  dataMudou(event: any) {
    const date = new Date(event.detail.value);
    this.planejamento.mes = (date.getMonth() + 1).toString(); // Converte para string
    this.planejamento.ano = date.getFullYear().toString(); // Converte para string
  }

  async enviar(form: NgForm) {
    if (form.valid) {
      this.planejamento.gastos = this.gastosSelecionados.join(','); // Armazena gastos como string
  
      // Verifica se a novaCategoriaGasto foi preenchida e atribui ao planejamento.categoria
      if (this.mostrarCampoCategoriaGasto && this.novaCategoriaGasto) {
        this.planejamento.categoria = this.novaCategoriaGasto;
      }
  
      await this.usuarioService.atualizar('planejamento_mensal', 'ID', this.planejamento.ID, this.planejamento).toPromise();
      const toast = await this.toastController.create({
        message: 'Planejamento atualizado com sucesso!',
        duration: 2000
      });
      toast.present();
      this.navCtrl.navigateBack('/planejamento'); // Navega de volta para a página de planejamento
    }
  }
  
}
