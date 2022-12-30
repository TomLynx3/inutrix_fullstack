import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserDataFormComponent } from 'src/app/components/user-data-form/user-data-form.component';
import {
  GetUserSettingsRes,
  MetabolicRates,
  UserData,
  UserSettingsService,
} from 'src/app/services/user-settings/user-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('userDataForm') public userDataForm:
    | UserDataFormComponent
    | undefined;
  constructor(
    private readonly _userSettingsService: UserSettingsService,
    private readonly _toastService: ToastrService,
    private readonly _translateService: TranslateService
  ) {}

  public scaleIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'weight-scale'],
  };

  public userData: UserData | undefined;
  public metabolicRates: MetabolicRates | undefined;
  public bmr: number = 0;
  public containerColor: string = '';

  ngOnInit(): void {
    this._userSettingsService
      .getUserSettings()
      .subscribe((res: GetUserSettingsRes) => {
        if (res.success && this.userDataForm) {
          this.userData = res.result;

          this.userDataForm.updateValues(res.result);
          this.metabolicRates = this._userSettingsService.getMetabolicRates(
            res.result
          );
          this.containerColor = this.getContainerColor(
            res.result.activityLevel
          );
        }
      });
  }

  public saveData(userData: UserData) {
    this._userSettingsService.saveUserSettings(userData).subscribe((res) => {
      if (res.success) {
        this._translateService
          .get('COMMON_SUCCESSFULLY_SAVED')
          .subscribe((tranx: string) => {
            this._toastService.success(tranx);
          });
      }
    });
  }

  public onFormChange(userData: UserData) {
    this.userData = userData;
    this.containerColor = this.getContainerColor(userData.activityLevel);
    this.metabolicRates = this._userSettingsService.getMetabolicRates(userData);
  }

  public getContainerColor(activityLevel: string): string {
    switch (activityLevel) {
      case 'ff057b6e-518e-44be-ad63-303b1bd6790e':
        return '#36f1cd';
      case '118e1755-5346-4e40-8f39-abfc3df1bc8b':
        return '#09d95f';
      case '179947b5-af69-42d1-b68a-fab5dbe97a53':
        return '#d9d209';
      case '214a3ef9-c981-4d5d-8904-009d119edc9c':
        return '#d98c09';
      case '53bbe11c-6805-4e98-b6a1-b0520ea070f6':
        return '#d92109';
    }
    return '';
  }
}
