import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExperienceComponent } from './popup-experience.component';

describe('PopupExperienceComponent', () => {
  let component: PopupExperienceComponent;
  let fixture: ComponentFixture<PopupExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
