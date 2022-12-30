import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { BaseModule } from './modules/base/base.module';

const routes: Routes = [
  { path: 'authenticate', component: SignupComponent },
  {
    path: '',
    loadChildren: () => BaseModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
