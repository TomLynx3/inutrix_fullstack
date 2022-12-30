import { CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import {
  DailyProduct,
  MealDTO,
  MealService,
  ProductListItem,
} from 'src/app/services/meal-service/meal.service';
import { ProductValueUpdate } from '../diet-plan/diet-plan.component';

@Component({
  selector: 'diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.scss'],
})
export class DietMealsComponent implements OnInit, OnChanges {
  @Input()
  public meals: MealDTO[] = [];

  @Input()
  public dailyProducts: DailyProduct[] = [];

  @Input()
  public allowDragAndDrop = false;

  @Output()
  public onValueChange: EventEmitter<ProductValueUpdate> =
    new EventEmitter<ProductValueUpdate>();

  public currentMeal: MealDTO | undefined;

  public products: ProductListItem[] = [];

  public forms: FormGroup[] = [
    new FormGroup({}),
    new FormGroup({}),
    new FormGroup({}),
  ];

  public currentIndex: number = 0;

  public arrowLeft: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-left'],
  };

  public arrowRight: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-right'],
  };

  public dragAndDropIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'plus'],
  };

  constructor(private readonly _mealService: MealService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this._init();
    this._initControllers();
  }

  ngOnInit(): void {
    this._init();

    this._initControllers();
  }

  private _initControllers() {
    const formGroup = this.currentForm;
    for (let product of this.products) {
      const formControl = new FormControl(product.amount, [
        Validators.min(0),
        Validators.max(product.maxValue),
      ]);

      formGroup.addControl(product.id, formControl);

      formControl.valueChanges.subscribe((val) => {
        this._onValueChange(product.id, val!, formControl);
      });
    }
  }

  public get currentForm(): FormGroup {
    return this.forms[this.currentIndex];
  }

  private _init() {
    this.currentMeal = this.meals[this.currentIndex];

    if (this.currentMeal) {
      this.products = this._mealService.castDailyProductToListItem(
        this.currentMeal.products
      );
    } else {
      this.products = [];
    }
  }

  public onDrop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const product: ProductListItem =
        event.previousContainer.data[event.previousIndex];

      if (product && !this.products.some((x) => x.id === product.id)) {
        const derefProduct: ProductListItem = JSON.parse(
          JSON.stringify(product)
        );

        const control = new FormControl(product.amount, [
          Validators.min(0),
          Validators.max(product.amount),
        ]);

        const formGroup = this.currentForm;

        formGroup.addControl(product.id, control);

        control.valueChanges.subscribe((val) => {
          this._onValueChange(product.id, val!, control);
        });

        this.products.push(derefProduct);

        product.amount = 0;

        this.currentMeal?.products.push(<DailyProduct>{
          productId: derefProduct.id,
          amount: derefProduct.amount / 100,
          productGroup: product.productGroup,
          name: product.name,
        });
      }
    }
  }

  private _onValueChange(id: string, value: number, control: FormControl) {
    const amount: number = value;

    if (isNaN(amount)) {
      control.patchValue(0);
      return;
    }

    if (this.currentMeal) {
      const mealProduct = this.currentMeal.products.find(
        (x) => x.productId === id
      );

      if (mealProduct) {
        mealProduct.amount = amount / 100;
      }
    }

    this.onValueChange.emit({ productId: id, amount: amount });
  }

  public nextMealType() {
    this.currentIndex++;
    this._init();
    this._initControllers();
  }
  public prevMealType() {
    this.currentIndex--;
    this._init();
    this._initControllers();
  }

  public mealType(): string {
    if (this.currentMeal) {
      return this._mealService.getMealTypeTranslationItem(
        this.currentMeal.mealType
      );
    }
    return '';
  }
}
