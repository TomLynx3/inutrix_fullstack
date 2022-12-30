import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDayComponent } from './diet-day.component';

describe('DietDayComponent', () => {
  let component: DietDayComponent;
  let fixture: ComponentFixture<DietDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
