import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'tela-principal',
    loadChildren: () => import('./tela-principal/tela-principal.module').then( m => m.TelaPrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'recursos',
    loadChildren: () => import('./recursos/recursos.module').then( m => m.RecursosPageModule)
  },

  {
    path: 'renda',
    loadChildren: () => import('./renda/renda.module').then( m => m.RendaPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'minhas-informacoes',
    loadChildren: () => import('./minhas-informacoes/minhas-informacoes.module').then( m => m.MinhasInformacoesPageModule)
  },
  {
    path: 'salvatransacao',
    loadChildren: () => import('./salvatransacao/salvatransacao.module').then( m => m.SalvatransacaoPageModule)
  },
  {
    path: 'planejamento',
    loadChildren: () => import('./planejamento/planejamento.module').then( m => m.PlanejamentoPageModule)
  },
  {
    path: 'salvaplanejamento',
    loadChildren: () => import('./salvaplanejamento/salvaplanejamento.module').then( m => m.SalvaplanejamentoPageModule)
  },
  {
    path: 'editatransacao',
    loadChildren: () => import('./editatransacao/editatransacao.module').then( m => m.EditatransacaoPageModule)
  },
  {
    path: 'editaplanejamento/:id',
    loadChildren: () => import('./editaplanejamento/editaplanejamento.module').then(m => m.EditaplanejamentoPageModule)
  },
  {
    path: 'grafico-planejamento',
    loadChildren: () => import('./grafico-planejamento/grafico-planejamento.module').then( m => m.GraficoPlanejamentoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
