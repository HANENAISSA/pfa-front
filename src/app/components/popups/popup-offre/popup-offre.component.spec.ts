import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOffreComponent } from './popup-offre.component';

describe('PopupOffreComponent', () => {
  let component: PopupOffreComponent;
  let fixture: ComponentFixture<PopupOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
