import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import {
  SocialLoginModule,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [AuthRoutingModule, CommonModule, SharedModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '928753829647-2l9lbo092er82kji0dmje4rqh9on28a6.apps.googleusercontent.com'
            ),
          },
        ],
      },
    },
  ],
  exports: [],
})
export class AuthModule {}
