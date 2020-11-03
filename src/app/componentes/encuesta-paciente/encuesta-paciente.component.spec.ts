import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaPacienteComponent } from './encuesta-paciente.component';

describe('EncuestaPacienteComponent', () => {
  let component: EncuestaPacienteComponent;
  let fixture: ComponentFixture<EncuestaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
