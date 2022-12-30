import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { BaseRoutingModule } from "./base-routing.module";
import { BaseComponent } from "./base/base.component";
import { SharedModule } from "../shared/shared.module";
import { SettingsComponent } from "./settings/settings.component";

import { ProductsModule } from "../products/products.module";
import { MealPlanModule } from "../meal-plan/meal-plan.module";
import { SettingsHintsPageComponent } from './settings/settings-hints-page/settings-hints-page.component';

@NgModule({
  declarations: [BaseComponent, SettingsComponent, SettingsHintsPageComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ProductsModule,
    MealPlanModule,
  ],
  exports: [],
})
export class BaseModule {}
