import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupShowCompetenceEtudiantComponent } from './popup-show-competence-etudiant.component';

describe('PopupShowCompetenceEtudiantComponent', () => {
  let component: PopupShowCompetenceEtudiantComponent;
  let fixture: ComponentFixture<PopupShowCompetenceEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupShowCompetenceEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupShowCompetenceEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
