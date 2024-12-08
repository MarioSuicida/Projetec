import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { usuariosService } from '../clientes.service';
import { Chart, ChartConfiguration, ChartTypeRegistry, DoughnutController, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrar o controlador necessário para o gráfico doughnut
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-grafico-planejamento',
  templateUrl: './grafico-planejamento.page.html',
  styleUrls: ['./grafico-planejamento.page.scss'],
})
export class GraficoPlanejamentoPage implements OnInit, OnDestroy, AfterViewChecked {
  planejamentos: any[] = [];
  graficos: Record<string, Chart> = {}; // Armazena as instâncias dos gráficos
  graficoCriado: boolean = false; // Flag para garantir que os gráficos só sejam criados uma vez

  constructor(
    private usuarioService: usuariosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarPlanejamentos();
  }

  ngOnDestroy() {
    this.destruirTodosGraficos(); // Limpa os gráficos ao destruir o componente
  }

  carregarPlanejamentos() {
    const usuarioLogado = JSON.parse(localStorage.getItem('user') || '{}');
    if (!usuarioLogado || !usuarioLogado.ID) {
      console.error('Usuário não encontrado ou não autenticado.');
      return;
    }

    this.usuarioService.listar('planejamento_mensal').subscribe(
      (planejamentos: any[]) => {
        this.planejamentos = planejamentos.filter(p => p.ID_usuario === usuarioLogado.ID);
        console.log('Planejamentos carregados do banco:', this.planejamentos);
        this.criarGraficos(); // Cria os gráficos assim que os dados forem carregados
      },
      (error) => {
        console.error('Erro ao carregar planejamentos do banco de dados:', error);
      }
    );
  }

  ngAfterViewChecked() {
    // Força a detecção de mudanças após a renderização
    this.cdr.detectChanges();

    // Verifica se os gráficos já foram criados antes de tentar criá-los novamente
    if (this.planejamentos.length > 0 && !this.graficoCriado) {
      this.criarGraficos();
      this.graficoCriado = true; // Marca que os gráficos foram criados
    }
  }

  criarGraficos() {
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
  
        // Configuração do gráfico doughnut
        const config: ChartConfiguration<keyof ChartTypeRegistry, number[], string> = {
          type: 'doughnut',  // Tipo de gráfico doughnut
          data: {
            labels: ['Meta de Despesas', 'Gastos'],
            datasets: [
              {
                data: [planejamento.meta_de_despesas, planejamento.gastos],
                backgroundColor: ['#4caf50', '#f44336'],
                label: `${planejamento.gastos} de ${planejamento.meta_de_despesas}`,  // Customização da legenda
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
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
          },
        };
  
        // Cria o gráfico e armazena a instância
        this.graficos[canvasId] = new Chart(ctx, config);
      } else {
        console.error(`Canvas com ID ${canvasId} não encontrado!`);
      }
    });
  }

  destruirTodosGraficos() {
    // Destrói todas as instâncias de gráficos
    Object.keys(this.graficos).forEach((canvasId) => {
      if (this.graficos[canvasId]) {
        console.log(`Destruindo gráfico no canvas ${canvasId}`);
        this.graficos[canvasId].destroy();
        delete this.graficos[canvasId];
      }
    });
  }
}
