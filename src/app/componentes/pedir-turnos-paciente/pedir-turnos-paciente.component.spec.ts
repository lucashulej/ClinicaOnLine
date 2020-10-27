import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirTurnosPacienteComponent } from './pedir-turnos-paciente.component';

describe('PedirTurnosPacienteComponent', () => {
  let component: PedirTurnosPacienteComponent;
  let fixture: ComponentFixture<PedirTurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedirTurnosPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
