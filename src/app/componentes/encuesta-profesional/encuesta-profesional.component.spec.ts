import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaProfesionalComponent } from './encuesta-profesional.component';

describe('EncuestaProfesionalComponent', () => {
  let component: EncuestaProfesionalComponent;
  let fixture: ComponentFixture<EncuestaProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
