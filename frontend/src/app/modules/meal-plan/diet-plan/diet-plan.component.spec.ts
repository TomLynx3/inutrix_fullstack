import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanComponent } from './diet-plan.component';

describe('DietPlanComponent', () => {
  let component: DietPlanComponent;
  let fixture: ComponentFixture<DietPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
