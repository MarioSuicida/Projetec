import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaPrincipalPage } from './tela-principal.page';

describe('TelaPrincipalPage', () => {
  let component: TelaPrincipalPage;
  let fixture: ComponentFixture<TelaPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
