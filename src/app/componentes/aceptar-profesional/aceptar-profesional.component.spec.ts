import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarProfesionalComponent } from './aceptar-profesional.component';

describe('AceptarProfesionalComponent', () => {
  let component: AceptarProfesionalComponent;
  let fixture: ComponentFixture<AceptarProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptarProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
