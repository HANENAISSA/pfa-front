import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitProfilEtudiantComponent } from './visit-profil-etudiant.component';

describe('VisitProfilEtudiantComponent', () => {
  let component: VisitProfilEtudiantComponent;
  let fixture: ComponentFixture<VisitProfilEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitProfilEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitProfilEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
