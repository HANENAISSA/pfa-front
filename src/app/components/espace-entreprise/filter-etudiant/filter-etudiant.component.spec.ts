import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEtudiantComponent } from './filter-etudiant.component';

describe('FilterEtudiantComponent', () => {
  let component: FilterEtudiantComponent;
  let fixture: ComponentFixture<FilterEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
