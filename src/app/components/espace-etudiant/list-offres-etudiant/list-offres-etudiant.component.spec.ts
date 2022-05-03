import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffresEtudiantComponent } from './list-offres-etudiant.component';

describe('ListOffresEtudiantComponent', () => {
  let component: ListOffresEtudiantComponent;
  let fixture: ComponentFixture<ListOffresEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOffresEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOffresEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
