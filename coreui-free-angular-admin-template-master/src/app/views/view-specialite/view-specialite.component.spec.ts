import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecialiteComponent } from './view-specialite.component';

describe('ViewSpecialiteComponent', () => {
  let component: ViewSpecialiteComponent;
  let fixture: ComponentFixture<ViewSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
