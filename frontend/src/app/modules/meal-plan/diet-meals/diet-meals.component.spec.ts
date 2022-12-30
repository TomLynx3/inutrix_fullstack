import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietMealsComponent } from './diet-meals.component';

describe('DietMealsComponent', () => {
  let component: DietMealsComponent;
  let fixture: ComponentFixture<DietMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietMealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
