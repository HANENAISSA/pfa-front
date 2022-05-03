import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffreStageComponent } from './new-offre-stage.component';

describe('NewOffreStageComponent', () => {
  let component: NewOffreStageComponent;
  let fixture: ComponentFixture<NewOffreStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOffreStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOffreStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
