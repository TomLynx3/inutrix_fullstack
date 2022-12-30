import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietProductListComponent } from './diet-product-list.component';

describe('DietProductListComponent', () => {
  let component: DietProductListComponent;
  let fixture: ComponentFixture<DietProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
