import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/utilities/types';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserData } from '../user-settings/user-settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _controllerURL: string = '/api/auth';

  constructor(
    private readonly _http: HttpClient,
    private readonly _jwtHelper: JwtHelperService
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined) {
      return !this._jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public signIn(token: string): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(this._controllerURL, { token });
  }

  public saveUser(token: string, userData: UserData): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._controllerURL}/save-user`, {
      token,
      userData,
    });
  }
}

export interface AuthResponse extends BaseResponse {
  result: string;
}
