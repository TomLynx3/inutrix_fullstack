import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from '../products/products.module';
import { MealPlanComponent } from './meal-plan/meal-plan.component';

const routes: Routes = [
  {
    path: '',
    component: MealPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealPlanRoutingModule {}
