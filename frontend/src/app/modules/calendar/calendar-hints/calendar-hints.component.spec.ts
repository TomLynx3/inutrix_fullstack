import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHintsComponent } from './calendar-hints.component';

describe('CalendarHintsComponent', () => {
  let component: CalendarHintsComponent;
  let fixture: ComponentFixture<CalendarHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
