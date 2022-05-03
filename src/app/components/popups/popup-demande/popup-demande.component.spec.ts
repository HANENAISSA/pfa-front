import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDemandeComponent } from './popup-demande.component';

describe('PopupDemandeComponent', () => {
  let component: PopupDemandeComponent;
  let fixture: ComponentFixture<PopupDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
