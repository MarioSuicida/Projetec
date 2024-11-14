import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RendaPage } from './renda.page';

describe('RendaPage', () => {
  let component: RendaPage;
  let fixture: ComponentFixture<RendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
