import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasInformacoesPage } from './minhas-informacoes.page';

describe('MinhasInformacoesPage', () => {
  let component: MinhasInformacoesPage;
  let fixture: ComponentFixture<MinhasInformacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasInformacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
