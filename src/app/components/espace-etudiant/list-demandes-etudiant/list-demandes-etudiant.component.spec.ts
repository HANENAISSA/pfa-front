import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesEtudiantComponent } from './list-demandes-etudiant.component';

describe('ListDemandesEtudiantComponent', () => {
  let component: ListDemandesEtudiantComponent;
  let fixture: ComponentFixture<ListDemandesEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandesEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandesEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
