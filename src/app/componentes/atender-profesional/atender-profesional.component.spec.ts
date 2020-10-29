import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderProfesionalComponent } from './atender-profesional.component';

describe('AtenderProfesionalComponent', () => {
  let component: AtenderProfesionalComponent;
  let fixture: ComponentFixture<AtenderProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtenderProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
