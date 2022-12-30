import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/utilities/types';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly _controllerURL: string = '/api/settings';

  constructor(private readonly _http: HttpClient) {}

  public getUserSettings(): Observable<GetUserSettingsRes> {
    return this._http.get<GetUserSettingsRes>(this._controllerURL);
  }

  public saveUserSettings(userData: UserData): Observable<BaseResponse> {
    return this._http.post<BaseResponse>(this._controllerURL, userData);
  }

  public getActivityLevels(): ActivityLevel[] {
    return [
      {
        id: 'ff057b6e-518e-44be-ad63-303b1bd6790e',
        name: 'USER_DATA_FORM_ACTIVITY_LEVEL_SEDENTARY_NAME',
        description: 'USER_DATA_FORM_ACTIVITY_LEVEL_SEDENTARY_DESCRIPTION',
        AMRrate: 1.2,
      },
      {
        id: '118e1755-5346-4e40-8f39-abfc3df1bc8b',
        name: 'USER_DATA_FORM_ACTIVITY_LEVEL_LIGHTLYACTIVE_NAME',
        description: 'USER_DATA_FORM_ACTIVITY_LEVEL_LIGHTLYACTIVE_DESCRIPTION',
        AMRrate: 1.375,
      },
      {
        id: '179947b5-af69-42d1-b68a-fab5dbe97a53',
        name: 'USER_DATA_FORM_ACTIVITY_LEVEL_MODERATELYACTIVE_NAME',
        description:
          'USER_DATA_FORM_ACTIVITY_LEVEL_MODERATELYACTIVE_DESCRIPTION',
        AMRrate: 1.55,
      },
      {
        id: '214a3ef9-c981-4d5d-8904-009d119edc9c',
        name: 'USER_DATA_FORM_ACTIVITY_LEVEL_ACTIVE_NAME',
        description: 'USER_DATA_FORM_ACTIVITY_LEVEL_ACTIVE_DESCRIPTION',
        AMRrate: 1.725,
      },
      {
        id: '53bbe11c-6805-4e98-b6a1-b0520ea070f6',
        name: 'USER_DATA_FORM_ACTIVITY_LEVEL_VERYACTIVE_NAME',
        description: 'USER_DATA_FORM_ACTIVITY_LEVEL_VERYACTIVE_DESCRIPTION',
        AMRrate: 1.9,
      },
    ];
  }

  private getBMR(userData: UserData): number {
    if (userData.gender === 'M') {
      return (
        66.47 +
        13.75 * userData.bodyWeight +
        5.003 * userData.height -
        6.755 * userData.age
      );
    } else {
      return (
        655.1 +
        9.563 * userData.bodyWeight +
        1.85 * userData.height -
        4.676 * userData.age
      );
    }
  }

  private getAMR(activityLevelID: string, BMR: number): number {
    const activityLevel = this.getActivityLevels().find(
      (x) => x.id === activityLevelID
    );

    if (activityLevel) {
      return activityLevel.AMRrate * BMR;
    }

    return 0;
  }

  public getMetabolicRates(userData: UserData): MetabolicRates {
    const rates: MetabolicRates = { BMR: 0, AMR: 0 };

    rates.BMR = this.getBMR(userData);
    rates.AMR = this.getAMR(userData.activityLevel, rates.BMR);

    return rates;
  }
}

export interface GetUserSettingsRes extends BaseResponse {
  result: UserData;
}

export interface MetabolicRates {
  BMR: number;
  AMR: number;
}

export interface UserData {
  bodyWeight: number;
  age: number;
  height: number;
  gender: string;
  activityLevel: string;
}

export interface ActivityLevel {
  id: string;
  name: string;
  description: string;
  AMRrate: number;
}

// export enum ActivityLevel{
//   SEDENTARY,
//   LIGHTLYACTIVE,
//   MODERATELYACTIVE,
//   ACTIVE,
//   VERYACTIVE
// }
