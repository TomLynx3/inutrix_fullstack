import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DailyProduct,
  Diet,
  DietDay,
  MealDTO,
  MealService,
  ProductListItem,
} from 'src/app/services/meal-service/meal.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import { ToastrService } from 'ngx-toastr';
import { DietMealsComponent } from '../diet-meals/diet-meals.component';
import { DietProductListComponent } from '../diet-product-list/diet-product-list.component';
@Component({
  selector: 'diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss'],
})
export class DietPlanComponent implements OnInit, OnChanges {
  @ViewChild('productList')
  public productList: DietProductListComponent | undefined;
  @Input()
  public diet: Diet | undefined;

  @Output()
  public onDietSave: EventEmitter<void> = new EventEmitter<void>();

  public currentIndex: number = 0;
  public currentDietDay: DietDay | undefined;
  public arrowLeft: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-left'],
  };

  public arrowRight: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-right'],
  };
  public calendar: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'calendar-days'],
  };
  public mealsIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'bowl-food'],
  };
  public nutritionIcon: CustomIcon = {
    iconFamily: IconFamily.PNG,
    value: 'assets/images/diet.png',
  };

  public adjustIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'bars-staggered'],
  };

  public saveIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'floppy-disk'],
  };

  public showMeals: boolean = true;
  public allowMealChange: boolean = false;
  public products: ProductListItem[] = [];

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _toastService: ToastrService,
    private readonly _mealService: MealService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.currentIndex = 0;
    this._initCurrentDietDay();
  }

  ngOnInit(): void {
    //Set locale

    moment.locale(this._translateService.currentLang);

    this._initCurrentDietDay();
  }

  private _initCurrentDietDay() {
    if (this.diet) {
      this.currentDietDay = this.diet.dietDays[this.currentIndex];
      console.log(this.currentDietDay);
      if (this.allowMealChange) {
        this.products = this._mealService.castDailyProductToListItem(
          this._recalculateProductAmounts(
            this.currentDietDay.dietDayMetadata.products,
            this.currentDietDay.dietDayMetadata.meals
          )
        );
      } else {
        this.products = this._mealService.castDailyProductToListItem(
          this.currentDietDay.dietDayMetadata.products
        );
      }
    }
  }

  public nextDay() {
    this.currentIndex += 1;
    this._initCurrentDietDay();
  }
  public prevDay() {
    this.currentIndex -= 1;
    this._initCurrentDietDay();
  }

  public showNutrients() {
    this.showMeals = false;
  }

  public setShowMeals() {
    this.showMeals = true;
  }

  public adjustMealProducts() {
    this.allowMealChange = !this.allowMealChange;
    this._initCurrentDietDay();

    const tranItem = this.allowMealChange
      ? 'MEAL_PLAN_MEAL_ADJUSTMENT_ALLOWED'
      : 'MEAL_PLAN_MEAL_ADJUSTMENT_STOPPED';

    this._translateService.get(tranItem).subscribe((tran: string) => {
      this._toastService.info(tran, '', { timeOut: 5000 });
    });
  }

  public onValueChange(value: ProductValueUpdate) {
    const product = this.currentDietDay?.dietDayMetadata.products.find(
      (x) => x.productId === value.productId
    );

    const listItem = this.products.find((x) => x.id === value.productId);

    //Get value over meals

    const mealProducts: DailyProduct[] = [];

    for (let meal of this.currentDietDay?.dietDayMetadata.meals!) {
      mealProducts.push(...meal.products);
    }

    const totalValue = mealProducts
      .filter((x) => x.productId === value.productId)
      .map((x) => x.amount)
      .reduce((prev, curent) => (prev += curent));

    if (listItem && product) {
      listItem.amount = this._mealService.castToGrams(
        product.amount - totalValue
      );
    }
  }

  private _recalculateProductAmounts(
    productList: DailyProduct[],
    meals: MealDTO[]
  ) {
    const res: DailyProduct[] = [];
    let mealProducts: DailyProduct[] = [];
    for (let meal of meals) {
      mealProducts.push(...meal.products);
    }

    for (let product of productList) {
      const mealAmount: number = mealProducts
        .filter((x) => x.productId === product.productId)
        .map((x) => x.amount)
        .reduce((prev, current) => current + prev, 0);

      const unRefProduct: DailyProduct = JSON.parse(JSON.stringify(product));

      if (mealAmount && !isNaN(mealAmount)) {
        unRefProduct.amount -= mealAmount;
      }

      res.push(unRefProduct);
    }
    return res;
  }

  public saveDiet() {
    if (this.diet) {
      for (let i = 0; i < this.diet?.dietDays.length; i++) {
        const currentDietDay = this.diet.dietDays[i];

        const products = this._mealService.castDailyProductToListItem(
          this._recalculateProductAmounts(
            currentDietDay.dietDayMetadata.products,
            currentDietDay.dietDayMetadata.meals
          )
        );

        for (let product of products) {
          if (product.amount !== 0) {
            this._translateService
              .get('MEAL_PLAN_CANT_SAVE_DIET')
              .subscribe((trans: string) => {
                this._toastService.error(trans);
                return;
              });
          }
        }
      }
    }

    this.onDietSave.emit();
  }
}

export interface ProductValueUpdate {
  productId: string;
  amount: number;
}
