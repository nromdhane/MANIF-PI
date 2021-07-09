import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialiteComponent } from './edit-specialite.component';

describe('EditSpecialiteComponent', () => {
  let component: EditSpecialiteComponent;
  let fixture: ComponentFixture<EditSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
