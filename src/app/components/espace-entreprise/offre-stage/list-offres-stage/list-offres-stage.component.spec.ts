import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffresStageComponent } from './list-offres-stage.component';

describe('ListOffresStageComponent', () => {
  let component: ListOffresStageComponent;
  let fixture: ComponentFixture<ListOffresStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOffresStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOffresStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
