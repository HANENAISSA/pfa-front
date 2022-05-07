import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffreStageComponent } from './edit-offre-stage.component';

describe('EditOffreStageComponent', () => {
  let component: EditOffreStageComponent;
  let fixture: ComponentFixture<EditOffreStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOffreStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOffreStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
