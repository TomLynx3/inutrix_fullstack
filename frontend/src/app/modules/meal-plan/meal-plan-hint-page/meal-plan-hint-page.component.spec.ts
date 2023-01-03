import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanHintPageComponent } from './meal-plan-hint-page.component';

describe('MealPlanHintPageComponent', () => {
  let component: MealPlanHintPageComponent;
  let fixture: ComponentFixture<MealPlanHintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealPlanHintPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanHintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
