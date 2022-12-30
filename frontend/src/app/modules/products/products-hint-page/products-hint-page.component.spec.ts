import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHintPageComponent } from './products-hint-page.component';

describe('ProductsHintPageComponent', () => {
  let component: ProductsHintPageComponent;
  let fixture: ComponentFixture<ProductsHintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsHintPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
