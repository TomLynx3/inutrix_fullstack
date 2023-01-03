import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { CustomIcon, IconFamily } from "@ibabylondev/custom-icon";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import {
  BalancedDietDetails,
  Diet,
  DietDay,
  DietGoal,
  GetDietRes,
  MealDTO,
  MealService,
  MealType,
} from "src/app/services/meal-service/meal.service";
// import { Translate } from 'src/app/utilities/tools';
import { SidemodalService } from "../../sidemodal/services/sidemodal.service";
import { DietsComponent } from "../diets/diets.component";

@Component({
  selector: "app-meal-plan",
  templateUrl: "./meal-plan.component.html",
  styleUrls: ["./meal-plan.component.scss"],
})
// @Translate({ en: require('../i18n/meal-plan.en.json') })
export class MealPlanComponent implements OnInit {
  @ViewChild("sidebar") public sideBar: TemplateRef<any> | undefined;
  @ViewChild("tabs") public tabs: MatTabGroup | undefined;
  @ViewChild("diets") public diets: DietsComponent | undefined;

  public days: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  public DietGoal = DietGoal;

  public addIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ["fas", "plus"],
  };

  public selectedDayAmount = 1;

  constructor(
    private readonly _sidebarModal: SidemodalService,
    private readonly _mealService: MealService,
    private readonly _translateService: TranslateService,
    private readonly _toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  public dietGoal: DietGoal = DietGoal.BALANCEDIET;
  public diet: Diet | undefined;

  public addNewMealPlan() {
    if (this.sideBar) {
      this._sidebarModal.open(this.sideBar, "800px");
    }
  }

  public close() {
    this._sidebarModal.close();
  }

  public selectDietGoal(dietGoal: DietGoal) {
    this.dietGoal = dietGoal;
  }

  public createDiet() {
    this._mealService
      .createDiet(this.dietGoal, this.selectedDayAmount)
      .subscribe((res: GetDietRes) => {
        if (res.success && this.tabs) {
          this.diet = res.result;

          setTimeout(() => {
            if (this.tabs) {
              this.tabs.selectedIndex = 0;
            }
          }, 200);
          this._sidebarModal.close();
        }
      });
  }

  public saveDiet() {
    this._mealService.saveDiet(this.diet!).subscribe((res) => {
      if (res.success) {
        this._translateService
          .get("MEAL_PLAN_DIET_SAVED")
          .subscribe((tran: string) => {
            this._toastService.success(tran);
            this.diets?.fetchDiets();
            this.diet = undefined;
          });
      }
    });
  }

  public selectDayAmout(amount: number) {
    this.selectedDayAmount = amount;
  }
}
