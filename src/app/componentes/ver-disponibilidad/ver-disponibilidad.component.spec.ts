import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDisponibilidadComponent } from './ver-disponibilidad.component';

describe('VerDisponibilidadComponent', () => {
  let component: VerDisponibilidadComponent;
  let fixture: ComponentFixture<VerDisponibilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerDisponibilidadComponent]
    });
    fixture = TestBed.createComponent(VerDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
