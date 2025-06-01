import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrupoEjerciciosPage } from './grupo-ejercicios.page';

describe('GrupoEjerciciosPage', () => {
  let component: GrupoEjerciciosPage;
  let fixture: ComponentFixture<GrupoEjerciciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
