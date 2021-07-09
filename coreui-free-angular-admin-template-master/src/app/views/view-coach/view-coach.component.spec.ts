import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoachComponent } from './view-coach.component';

describe('ViewCoachComponent', () => {
  let component: ViewCoachComponent;
  let fixture: ComponentFixture<ViewCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
