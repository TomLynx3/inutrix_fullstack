import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  AnyActiveDietRes,
  DietService,
} from "src/app/services/diet/diet.service";
import {
  DietMetadataListItem,
  GetUsetDietsRes,
  MealService,
} from "src/app/services/meal-service/meal.service";
import { SidemodalService } from "../../sidemodal/services/sidemodal.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "diets",
  templateUrl: "./diets.component.html",
  styleUrls: ["./diets.component.scss"],
})
export class DietsComponent implements OnInit {
  @ViewChild("sidebar") public sideModal: TemplateRef<any> | undefined;

  public diets: DietMetadataListItem[] = [];
  constructor(
    private readonly _mealServive: MealService,
    private readonly _dietService: DietService,
    private readonly _sideModalService: SidemodalService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _translateService: TranslateService,
    private readonly _toastService: ToastrService
  ) {}

  public fromDate = new Date();

  public selectedDiet: DietMetadataListItem | undefined;

  public date: FormControl = new FormControl(moment().toDate());

  ngOnInit(): void {
    this._mealServive.getUserDiets().subscribe((res: GetUsetDietsRes) => {
      if (res.success) {
        this.diets = this._mealServive.castToDietMetadataListItems(res.result);
      }
    });
  }

  public setNewActiveDiet(listitem: DietMetadataListItem) {
    this._dietService
      .checkIsAnyActiveDIet()
      .subscribe((res: AnyActiveDietRes) => {
        if (res.success && res.result) {
          const ref = this._dialog.open(ConfirmationDialogComponent, {
            disableClose: true,
            data: {
              text: "MEAL_PLAN_ERASE_ACTIVE_DIET",
              title: "MEAL_PLAN_WARNING",
            },
          });

          ref.afterClosed().subscribe((proceed) => {
            if (proceed) {
              this._openModal(listitem);
            }
          });
        } else if (res.success && !res.result) {
          this._openModal(listitem);
        }
      });
  }

  private _openModal(listitem: DietMetadataListItem) {
    if (this.sideModal) {
      this.date.patchValue(moment().toDate());
      this.selectedDiet = listitem;
      this._sideModalService.open(this.sideModal, "560px");
    }
  }

  public setDiet() {
    this._dietService
      .setActiceDiet(this.selectedDiet!.id, this.date.value)
      .subscribe((res) => {
        if (res.success) {
          this._translateService
            .get("MEAL_PLAN_SUCCESFULLY_ADDED_NEW_ACTIVE_DIET")
            .subscribe((tranx) => {
              this._sideModalService.close();
              this._router.navigate(["/calendar"]);
              this._toastService.success(tranx);
            });
        }
      });
  }

  public close() {
    this._sideModalService.close();
  }

  public filter = (m: any): boolean => {
    return moment(m).isSameOrAfter(moment(), "D");
  };

  public get finishDate() {
    if (this.selectedDiet) {
      return moment(this.date.value).add("day", this.selectedDiet.days - 1);
    }
    return moment();
  }
}
