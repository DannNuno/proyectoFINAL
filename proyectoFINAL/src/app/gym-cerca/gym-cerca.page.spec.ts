import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymCercaPage } from './gym-cerca.page';

describe('GymCercaPage', () => {
  let component: GymCercaPage;
  let fixture: ComponentFixture<GymCercaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GymCercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
