import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCvComponent } from './formulaire-cv.component';

describe('FormulaireCvComponent', () => {
  let component: FormulaireCvComponent;
  let fixture: ComponentFixture<FormulaireCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
