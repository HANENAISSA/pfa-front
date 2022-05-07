import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitProfilResponsableComponent } from './visit-profil-responsable.component';

describe('VisitProfilResponsableComponent', () => {
  let component: VisitProfilResponsableComponent;
  let fixture: ComponentFixture<VisitProfilResponsableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitProfilResponsableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitProfilResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
