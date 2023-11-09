import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaObrasSocialesComponent } from './lista-obras-sociales.component';

describe('ListaObrasSocialesComponent', () => {
  let component: ListaObrasSocialesComponent;
  let fixture: ComponentFixture<ListaObrasSocialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaObrasSocialesComponent]
    });
    fixture = TestBed.createComponent(ListaObrasSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
