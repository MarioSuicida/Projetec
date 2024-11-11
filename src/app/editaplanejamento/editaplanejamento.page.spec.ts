import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditaplanejamentoPage } from './editaplanejamento.page';

describe('EditaplanejamentoPage', () => {
  let component: EditaplanejamentoPage;
  let fixture: ComponentFixture<EditaplanejamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaplanejamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
