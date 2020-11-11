import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTurnosAdministradorComponent } from './buscar-turnos-administrador.component';

describe('BuscarTurnosAdministradorComponent', () => {
  let component: BuscarTurnosAdministradorComponent;
  let fixture: ComponentFixture<BuscarTurnosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarTurnosAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarTurnosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
