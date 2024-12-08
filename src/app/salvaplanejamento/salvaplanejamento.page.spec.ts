import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalvaplanejamentoPage } from './salvaplanejamento.page';

describe('SalvaplanejamentoPage', () => {
  let component: SalvaplanejamentoPage;
  let fixture: ComponentFixture<SalvaplanejamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvaplanejamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
