import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilCoachComponent } from './conseil-coach.component';

describe('ConseilCoachComponent', () => {
  let component: ConseilCoachComponent;
  let fixture: ComponentFixture<ConseilCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConseilCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConseilCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
