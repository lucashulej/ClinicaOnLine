import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosProfesionalComponent } from './turnos-profesional.component';

describe('TurnosProfesionalComponent', () => {
  let component: TurnosProfesionalComponent;
  let fixture: ComponentFixture<TurnosProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
