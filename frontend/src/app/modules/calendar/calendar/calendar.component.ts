import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

import {
  DietProgress,
  DietProgressDTO,
  DietProgressProductDTO,
  DietService,
  GetCurrentDietRes,
} from "src/app/services/diet/diet.service";
import { MenuService } from "src/app/services/menu/menu.service";

// import { Translate } from 'src/app/utilities/tools';
import { BaseResponse } from "src/app/utilities/types";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
// @Translate({
//   en: require('../i18n/calendar.en.json'),
// })
export class CalendarComponent implements OnInit {
  public days: string[] = [];
  public progress: DietProgressDTO | undefined;
  public currentDayProducts: DietProgressProductDTO[] = [];
  public date: string | undefined;

  public progressPerc: number = 0;

  private _dietProgress: DietProgress[] = [];

  constructor(
    private readonly _dietService: DietService,
    private readonly _translateService: TranslateService,
    private readonly _toastrService: ToastrService,
    private readonly _menuService: MenuService
  ) {}

  ngOnInit(): void {
    this._dietService.getCurrentDiet().subscribe((res: GetCurrentDietRes) => {
      if (res.success && res.result != null) {
        this.progress = res.result;
        this.days = res.result.days.map((x) => x.date);
        this.getTotalProgress();
        this.currentDayProducts = this.progress.days[0].products;
        this.date = this.days[0];
      }
    });
  }

  public onDayChange(index: number) {
    if (this.progress) {
      this.currentDayProducts = this.progress.days[index].products;
      this.date = this.days[index];
    }
  }

  public getTotalProgress() {
    let totalProducts = 0;
    let consumed = 0;
    if (this.progress) {
      for (let day of this.progress.days) {
        for (let product of day.products) {
          totalProducts++;

          if (product.consumed) {
            consumed++;
          }
        }
      }
    }

    this.progressPerc = (consumed / totalProducts) * 100;
  }

  private getProgressPercColor() {
    if (this.progressPerc > 30 && this.progressPerc < 60) {
      return "#DCD41A";
    } else if (this.progressPerc >= 60) {
      return "#36f1cd";
    } else {
      return "#e61444";
    }
  }

  public getBGColor() {
    return `conic-gradient(${this.getProgressPercColor()} var(--progress), #39a0ed 0deg)`;
  }

  public getDegree() {
    return `${(this.progressPerc * 360) / 100}deg`;
  }

  public onConsume(dietProgress: DietProgress) {
    const progress = this._dietProgress.find(
      (x) => x.date === dietProgress.date
    );

    if (progress) {
      for (let product of dietProgress.products) {
        const productInList = progress.products.find(
          (x) => x.productId === product.productId
        );

        if (productInList) {
          productInList.consumed = product.consumed;
        } else {
          progress.products.push(product);
        }
      }
    } else {
      this._dietProgress.push(dietProgress);
    }
    this.getTotalProgress();
  }

  public updateProgress() {
    this._dietService
      .updateProgress(this.progress!.dietHistoryId, this._dietProgress)
      .subscribe((res: BaseResponse) => {
        if (res.success) {
          this._translateService
            .get("CELENDAR_PROGRESS_UPDATE_SUCCESSFULLY")
            .subscribe((tran: string) => {
              this._toastrService.success(tran);
            });
        }
      });
  }

  public get isUpdateDisabled() {
    return this._dietProgress.length <= 0;
  }

  public updateMenu() {
    this._menuService.updatePage("/meal-plans");
  }
}
