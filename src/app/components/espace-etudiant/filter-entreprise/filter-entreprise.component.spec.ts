import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEntrepriseComponent } from './filter-entreprise.component';

describe('FilterEntrepriseComponent', () => {
  let component: FilterEntrepriseComponent;
  let fixture: ComponentFixture<FilterEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
