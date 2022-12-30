import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import {
  ConsumedProduct,
  DietProductItem,
  DietProgress,
  DietProgressProductDTO,
  DietService,
} from "src/app/services/diet/diet.service";
import * as moment from "moment";
import {
  DietGoal,
  MealService,
  MealType,
} from "src/app/services/meal-service/meal.service";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: "diet-day",
  templateUrl: "./diet-day.component.html",
  styleUrls: ["./diet-day.component.scss"],
})
export class DietDayComponent implements OnInit, OnChanges {
  @ViewChild("complete") public completeCheckBox: MatCheckbox | undefined;

  @Input()
  public products: DietProgressProductDTO[] = [];

  @Input()
  public date: string | undefined;

  @Input()
  public dietGoal: DietGoal | undefined;

  @Input()
  public kcal: number = 0;

  @Output()
  public onConsume: EventEmitter<DietProgress> =
    new EventEmitter<DietProgress>();

  public dietProductItems: DietProductItem[] = [];

  public arrowLeft: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "arrow-left"],
  };

  public arrowRight: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "arrow-right"],
  };

  public currentMealIndex: number = 0;

  public allowUpdate: boolean = false;

  private _mealTypes: MealType[] = [
    MealType.BREAKFAST,
    MealType.LUNCH,
    MealType.DINNER,
  ];

  constructor(
    private readonly _dietService: DietService,
    private readonly _mealService: MealService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.sortProducts();
    this._checkIfUpdateAllowed();
    this.setCompleteCheckbox();
  }

  ngOnInit(): void {
    this.currentMealIndex = this._getCurrentMealTypeIndex();

    this.sortProducts();
    this._checkIfUpdateAllowed();
    this.setCompleteCheckbox();
  }

  public sortProducts() {
    const products = this.products.filter(
      (x) => x.mealType === this._mealTypes[this.currentMealIndex]
    );

    this.dietProductItems = this._dietService.parseToDietProductItems(products);
  }

  private _getCurrentMealTypeIndex() {
    const time = parseInt(moment().format("H"));
    if (time >= 5 && time < 11) {
      return 0;
    } else if (time >= 11 && time < 15) {
      return 1;
    } else {
      return 2;
    }
  }

  private _checkIfUpdateAllowed() {
    if (this.date) {
      const today = moment();
      const date = moment(this.date);
      console.log(today);
      console.log(date);
      if (date.isBefore(today, "day")) {
        this.allowUpdate = true;
      } else if (date.isAfter(today, "day")) {
        this.allowUpdate = false;
      } else {
        if (this.currentMealIndex > this._getCurrentMealTypeIndex()) {
          console.log("sd");
          this.allowUpdate = false;
        } else {
          this.allowUpdate = true;
        }
      }
    }
  }

  public get mealType() {
    return this._mealService.getMealTypeTranslationItem(
      this._mealTypes[this.currentMealIndex]
    );
  }

  public nextMeal() {
    this.currentMealIndex++;
    this.sortProducts();
    this.setCompleteCheckbox();
    this._checkIfUpdateAllowed();
  }
  public prevMeal() {
    this.currentMealIndex--;
    this.sortProducts();
    this.setCompleteCheckbox();
    this._checkIfUpdateAllowed();
  }

  public onCompleteChange(event: any) {
    for (let product of this.dietProductItems) {
      product.consumed = event.checked;
    }

    const products = this.products.filter(
      (x) => x.mealType === this._mealTypes[this.currentMealIndex]
    );

    const productsToUpdate = [];

    for (let product of products) {
      product.consumed = event.checked;

      productsToUpdate.push(<ConsumedProduct>{
        productId: product.productId,
        consumed: product.consumed,
      });
    }

    this.onConsume.emit({ date: this.date!, products: productsToUpdate });
  }

  public onProductConsume(event: any, product: DietProductItem) {
    product.consumed = event.checked;

    const pr = this.products.find((x) => x.productId === product.id);

    if (pr) {
      pr.consumed = event.checked;
    }

    const consumedProduct = <ConsumedProduct>{
      productId: product.id,
      consumed: product.consumed,
    };

    this.onConsume.emit({ date: this.date!, products: [consumedProduct] });

    if (this.completeCheckBox) {
      for (let listProduct of this.dietProductItems) {
        if (!listProduct.consumed) {
          this.completeCheckBox.checked = false;
          return;
        }
      }

      this.completeCheckBox.checked = true;
    }
  }

  public setCompleteCheckbox() {
    if (this.completeCheckBox) {
      const products = this.products.filter(
        (x) => x.mealType === this._mealTypes[this.currentMealIndex]
      );

      for (let product of products) {
        if (!product.consumed) {
          this.completeCheckBox.checked = false;

          return;
        }
      }

      this.completeCheckBox.checked = true;
    }
  }

  public get containerColor() {
    if (this.dietGoal) {
      return this._mealService.getDietGoalContainerColor(this.dietGoal);
    }
    return "#ffffff";
  }

  public get dietGoalName() {
    if (this.dietGoal) {
      return this._mealService.getDietGoalTranslationItem(this.dietGoal);
    }

    return "";
  }
}
