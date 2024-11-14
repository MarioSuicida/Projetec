import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditatransacaoPage } from './editatransacao.page';

describe('EditatransacaoPage', () => {
  let component: EditatransacaoPage;
  let fixture: ComponentFixture<EditatransacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditatransacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
