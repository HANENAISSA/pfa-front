import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAccrefStageComponent } from './popup-accref-stage.component';

describe('PopupAccrefStageComponent', () => {
  let component: PopupAccrefStageComponent;
  let fixture: ComponentFixture<PopupAccrefStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAccrefStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAccrefStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
