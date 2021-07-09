import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecialiteComponent } from './delete-specialite.component';

describe('DeleteSpecialiteComponent', () => {
  let component: DeleteSpecialiteComponent;
  let fixture: ComponentFixture<DeleteSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpecialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
