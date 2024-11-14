import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanejamentoPage } from './planejamento.page';

describe('PlanejamentoPage', () => {
  let component: PlanejamentoPage;
  let fixture: ComponentFixture<PlanejamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
