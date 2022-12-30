import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from '../products/products.module';
import { MatTabsModule } from '@angular/material/tabs';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { DietProductListComponent } from './diet-product-list/diet-product-list.component';
import { DietDayNutritionComponent } from './diet-day-nutrition/diet-day-nutrition.component';
import { DietMealsComponent } from './diet-meals/diet-meals.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DietsComponent } from './diets/diets.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    MealPlanComponent,
    DietPlanComponent,
    DietProductListComponent,
    DietDayNutritionComponent,
    DietMealsComponent,
    DietsComponent,
  ],
  imports: [
    CommonModule,
    MealPlanRoutingModule,
    SharedModule,
    ProductsModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
})
export class MealPlanModule {}
