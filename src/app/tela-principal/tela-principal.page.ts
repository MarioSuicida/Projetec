import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart, registerables,Tooltip, ChartConfiguration , ChartTypeRegistry } from 'chart.js';
import { MenuController, NavController } from '@ionic/angular';
import { usuariosService, transacao, planejamento_mensal } from '../clientes.service';

// Registra todos os componentes necessários do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.page.html',
  styleUrls: ['./tela-principal.page.scss'],
})
export class TelaPrincipalPage implements OnInit, AfterViewInit {
  @ViewChild('planejamentoChart', { static: false }) planejamentoChart: ElementRef<HTMLCanvasElement> = null!;
  @ViewChild('lineChart', { static: false }) lineChart: ElementRef<HTMLCanvasElement> = null!;
  @ViewChild('barChart', { static: false }) barChart: ElementRef<HTMLCanvasElement> = null!;
  @ViewChild('pieChart', { static: false }) pieChart: ElementRef<HTMLCanvasElement> = null!;

  user: any;
  planejamentos: planejamento_mensal[] = [];
  transacoes: transacao[] = [];
  categoriasGasto: string[] = [];
  meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  indiceMesAtual: number = new Date().getMonth();
  totalRenda: number = 0;
  totalGasto: number = 0;
  saldo: number = 0;
  graficoPlanejamento: any; // Gráfico de planejamento
  grafico: Chart | null = null; // Gráfico de saldo diário
  graficoDespesas: Chart | null = null; // Gráfico de barras para despesas
  graficoPizza: Chart<'pie', number[], string> | null = null; // Gráfico de pizza
  graficos: Record<string, Chart> = {}; // Armazena as instâncias dos gráficos
  graficoCriado: boolean = false;
  rendaDisponivel: boolean = false;
  gastosDisponiveis: boolean = false;


  constructor(private menuCtrl: MenuController, 
    private navCtrl: NavController, 
    private usuariosService: usuariosService,
    private cdr: ChangeDetectorRef) {}

    

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Usuário carregado:', this.user);
    } else {
      console.log('Nenhum usuário encontrado no localStorage');
    }
    this.carregarPlanejamentos();
    this.carregarTransacoes();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.atualizarGraficos();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  
    if (!this.graficoCriado && this.planejamentos.length > 0) {
      this.criarGraficoPlanejamento();
      this.graficoCriado = true;
    }
  }
  

  carregarPlanejamentos() {
    const usuarioLogado = JSON.parse(localStorage.getItem('user') || '{}');
    if (!usuarioLogado || !usuarioLogado.ID) {
      console.error('Usuário não encontrado ou não autenticado.');
      return;
    }
    const mesAtual = (this.indiceMesAtual + 1).toString().padStart(1, '0');

    Object.keys(this.graficos).forEach((key) => {
      if (this.graficos[key]) {
        console.log(`Destruindo gráfico: ${key}`);
        this.graficos[key].destroy();
        delete this.graficos[key];
      }
    });

    this.usuariosService.listar('planejamento_mensal').subscribe(
      (planejamentos: any[]) => {
        this.planejamentos = planejamentos.filter
        (p => p.ID_usuario === usuarioLogado.ID && p.mes === mesAtual);
        console.log('Planejamentos carregados:', this.planejamentos);
        setTimeout(() => {
          this.criarGraficoPlanejamento(); // Chama a função para criar o gráfico
        }, 100);
      },
      (error) => {
        console.error('Erro ao carregar planejamentos:', error);
      }
    );
  }

  criarGraficoPlanejamento() {
    // Verifica se a variável 'planejamentos' não está vazia
    if (this.planejamentos.length === 0) {
      console.log('Nenhum planejamento encontrado para exibir.');
      return;
    }
  
    // Para cada planejamento, cria um gráfico
    this.planejamentos.forEach((planejamento, index) => {
      const canvasId = `graficoPlanejamento${index}`;
      const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
  
      if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        if (!ctx) {
          console.error(`Contexto do canvas com ID ${canvasId} não encontrado.`);
          return;
        }
  
        // Destroi o gráfico existente se houver
        if (this.graficos[canvasId]) {
          console.log(`Destruindo gráfico existente no canvas ${canvasId}`);
          this.graficos[canvasId].destroy();  // Destruir o gráfico antigo
        }
  
        // Configuração do gráfico de barras deitado
        const config: ChartConfiguration<keyof ChartTypeRegistry, number[], string> = {
          type: 'bar', 
          data: {
            labels: ['Meta de Despesas', 'Gastos'],
            datasets: [
              {
                data: [
                  Number(planejamento.meta_de_despesas),
                  Number(planejamento.gastos)
                ],
                backgroundColor: ['#4caf50', '#f44336'],
                label: `${planejamento.gastos} de ${planejamento.meta_de_despesas}`, 
              },
            ],
          },
          options: {
            responsive: true,
            indexAxis: 'y',  // Isso faz com que as barras sejam horizontais
            plugins: {
              legend: {
                position: 'top',
                labels:{
                  color : 'white' , 
                }
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    return `${label}: R$ ${value}`;  // Personalização da tooltip
                  },
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks:{
                  color:'white',
                } , // As barras começam do zero no eixo X
              },y:{
                ticks:{
                  color:'white',
                }
              },
            },
          },
        };
  
        // Cria o gráfico e armazena a instância
        this.graficos[canvasId] = new Chart(ctx, config);
      } else {
        console.error(`Canvas com ID ${canvasId} não encontrado!`);
      }
    });
  }
  
  
  carregarTransacoes() {
    const usuarioLogado = JSON.parse(localStorage.getItem('user') || '{}');
    if (!usuarioLogado || !usuarioLogado.ID) {
      console.error('Usuário não encontrado ou não autenticado.');
      return;
    }
  
    const mesAtual = (this.indiceMesAtual + 1).toString().padStart(1, '0');
    this.usuariosService.getAll<transacao>('transacao', 'mes', mesAtual).subscribe(
      (response) => {
        // Filtra as transações pelo ID do usuário
        this.transacoes = response.filter(t => t.ID_usuario === usuarioLogado.ID);
        console.log(`Transações carregadas para ${this.mudancasMes}:`, this.transacoes);
        
        // Calcula a renda total e o gasto total
        this.totalRenda = this.transacoes.filter(t => t.tipo === 'renda').reduce((acc, transacao) => acc + parseFloat(transacao.valor), 0);
        this.totalGasto = this.transacoes.filter(t => t.tipo === 'gasto').reduce((acc, transacao) => acc + parseFloat(transacao.valor), 0);
        this.saldo = this.totalRenda - this.totalGasto;
  
        // Atualiza o status das variáveis
        this.rendaDisponivel = this.totalRenda > 0;
        this.gastosDisponiveis = this.totalGasto > 0;
  
        // Coleta categorias de gasto sem duplicatas
        this.categoriasGasto = [...new Set(this.transacoes.filter(t => t.tipo === 'gasto').map(t => t.categoria))];
        console.log('Categorias de Gasto:', this.categoriasGasto);
  
        this.atualizarGraficos();
      },
      (error) => {
        console.error('Erro ao carregar transações:', error);
      }
    );
  }
  


atualizarGraficos() {
  if (!this.transacoes.length) {
    console.warn('Nenhuma transação disponível para atualizar gráficos.');
    return;
  }

  setTimeout(() => {
    if (this.rendaDisponivel) {
      this.gerarGrafico();
    }
    if (this.gastosDisponiveis) {
      this.gerarGraficoDespesas();
      this.gerarGraficoPizza();
    }
  }, 100);
}


  gerarGrafico() {
    if (this.grafico) {
      this.grafico.destroy();
    }

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const valoresBrutos = dias.map(dia => {
      const totalDia = this.transacoes
        .filter(t => parseInt(t.dia) === dia)
        .reduce((acc, transacao) => {
          const valor = parseFloat(transacao.valor);
          return transacao.tipo === 'renda' ? acc + valor : acc - valor; // Rendas adicionam, gastos subtraem
        }, 0);
      return totalDia;
    });

    this.grafico = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: dias,
        datasets: [{
          label: '',
          data: valoresBrutos,
          borderColor: 'white',
          backgroundColor: 'white',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Dia do Mês' }, ticks: { color: 'white' }, grid: { display: false } },
          y: { title: { display: true }, ticks: { color: 'white' }, beginAtZero: false, grid: { display: false } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  gerarGraficoDespesas() {
    if (this.graficoDespesas) {
      this.graficoDespesas.destroy();
    }

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const despesasPorDia = dias.map(dia => {
      const totalDia = this.transacoes
        .filter(t => t.tipo === 'gasto' && parseInt(t.dia) === dia)
        .reduce((acc, transacao) => acc + parseFloat(transacao.valor), 0);
      return totalDia;
    });

    this.graficoDespesas = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: dias,
        datasets: [{
          label: '',
          data: despesasPorDia,
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Dia do Mês' }, ticks: { color: 'white' }, grid: { display: false } },
          y: { title: { display: true }, ticks: { color: 'white' }, beginAtZero: true, grid: { display: false } }
        },
        plugins: {
          legend: { display: false, labels:{color: 'white'}}
        }
      }
    });
  }

  gerarGraficoPizza() {
    if (this.graficoPizza) {
      this.graficoPizza.destroy();
    }

    const categorias = this.categoriasGasto;
    const gastosCategoria = categorias.map(categoria => {
      return this.transacoes
        .filter(t => t.categoria === categoria && t.tipo === 'gasto')
        .reduce((acc, transacao) => acc + parseFloat(transacao.valor), 0);
    });

    this.graficoPizza = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: categorias,
        datasets: [{
          data: gastosCategoria,
          backgroundColor: ['rgba(255, 127, 80, 1)', 'rgba(64, 224, 208, 1)',
             'rgba(127, 255, 212, 1)', ' rgba(255, 255, 204, 1)'],
          borderWidth:0,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels:{color:'white',font:{size:14},} },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: R$ ${value}`;
              },
            },
          },
        },
      }
    });
  }

  
  
  calcularGastoPorCategoria(categoria: string): number {
    return this.transacoes
      .filter(t => t.tipo === 'gasto' && t.categoria === categoria)
      .reduce((acc, transacao) => acc + parseFloat(transacao.valor), 0);
  }

  ionViewWillEnter() {

    this.carregarTransacoes();
    this.graficoCriado = false; 
    this.carregarPlanejamentos();
  }
  
  get mudancasMes(): string {
    return this.meses[this.indiceMesAtual];
  }

  anteriorMes() {
    this.indiceMesAtual = (this.indiceMesAtual - 1 + this.meses.length) % this.meses.length;
    this.carregarTransacoes();
    this.carregarPlanejamentos();
    
  }

  proximoMes() {
    this.indiceMesAtual = (this.indiceMesAtual + 1) % this.meses.length;
    this.carregarTransacoes();
    this.carregarPlanejamentos()
    
    
  }

  openConfigMenu() {
    this.menuCtrl.open('config-menu');
  }

  async fechaMenuConf() {
    await this.menuCtrl.close('config-menu');
    this.navCtrl.navigateBack('/tela-principal');
  }

  showRecursos() {
    this.navCtrl.navigateForward('/recursos');
  }

  showRenda() {
    this.navCtrl.navigateForward('/renda');
  }

  showPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }

  showPlanejamento() {
    this.navCtrl.navigateForward('/planejamento');
  }
}
