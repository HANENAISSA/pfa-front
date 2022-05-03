import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCandidaturesComponent } from './demande-candidatures.component';

describe('DemandeCandidaturesComponent', () => {
  let component: DemandeCandidaturesComponent;
  let fixture: ComponentFixture<DemandeCandidaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeCandidaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
