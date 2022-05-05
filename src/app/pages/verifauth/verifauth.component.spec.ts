import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifauthComponent } from './verifauth.component';

describe('VerifauthComponent', () => {
  let component: VerifauthComponent;
  let fixture: ComponentFixture<VerifauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
