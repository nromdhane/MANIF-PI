import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoachComponent } from './delete-coach.component';

describe('DeleteCoachComponent', () => {
  let component: DeleteCoachComponent;
  let fixture: ComponentFixture<DeleteCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
