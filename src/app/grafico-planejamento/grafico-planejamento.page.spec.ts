import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoPlanejamentoPage } from './grafico-planejamento.page';

describe('GraficoPlanejamentoPage', () => {
  let component: GraficoPlanejamentoPage;
  let fixture: ComponentFixture<GraficoPlanejamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoPlanejamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
