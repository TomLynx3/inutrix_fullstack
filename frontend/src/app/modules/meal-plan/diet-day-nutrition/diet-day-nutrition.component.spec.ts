import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDayNutritionComponent } from './diet-day-nutrition.component';

describe('DietDayNutritionComponent', () => {
  let component: DietDayNutritionComponent;
  let fixture: ComponentFixture<DietDayNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDayNutritionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDayNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
