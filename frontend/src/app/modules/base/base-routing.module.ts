import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from '../calendar/calendar.module';
import { MealPlanModule } from '../meal-plan/meal-plan.module';
import { ProductsModule } from '../products/products.module';
import { BaseComponent } from './base/base.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'products',
        loadChildren: () => ProductsModule,
      },
      {
        path: 'meal-plans',
        loadChildren: () => MealPlanModule,
      },
      {
        path: 'calendar',
        loadChildren: () => CalendarModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
