import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCompetenceComponent } from './popup-competence.component';

describe('PopupCompetenceComponent', () => {
  let component: PopupCompetenceComponent;
  let fixture: ComponentFixture<PopupCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
