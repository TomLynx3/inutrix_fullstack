import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthResponse, AuthService } from 'src/app/services/auth/auth.service';
import { UserData } from 'src/app/services/user-settings/user-settings.service';
// import { Translate } from 'src/app/utilities/tools';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('btn') public googleButton: ElementRef = new ElementRef({});

  constructor(
    private readonly _authService: SocialAuthService,
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) {}

  private _userToken: string = '';
  public showAddionalDataForm: boolean = false;

  ngAfterViewInit(): void {
    window.addEventListener('load', (event) => {
      // @ts-ignore
      window.google.accounts.id.renderButton(this.googleButton.nativeElement, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: '150',
        shape: 'pill',
        ux_mode: 'popup',
      });
    });
  }

  ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/']);
    }
    this._authService.authState.subscribe((user) => {
      console.log(user.idToken);
      this._auth.signIn(user.idToken).subscribe((res: AuthResponse) => {
        if (res.error != null && res.error.errorCode === 'A-1') {
          this._userToken = user.idToken;
          this.showAddionalDataForm = true;
        } else {
          this._auth.saveToken(user.idToken);
          this._router.navigate(['/']);
        }
      });
    });
  }

  public signInWithGoogle() {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {});
  }

  public saveUser(userData: UserData): void {
    this._auth
      .saveUser(this._userToken, userData)
      .subscribe((res: AuthResponse) => {
        if (res.success) {
          this._auth.saveToken(res.result);
          this._router.navigate(['/']);
        }
      });
  }
}
