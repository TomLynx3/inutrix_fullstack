import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import {
  ActivityLevel,
  UserData,
  UserSettingsService,
} from 'src/app/services/user-settings/user-settings.service';

// import { Translate } from 'src/app/utilities/tools';

@Component({
  selector: 'user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss'],
})
// @Translate({ en: require('./i18n/user.data.form.en.json') })
export class UserDataFormComponent implements OnInit {
  @Output() public submitForm: EventEmitter<UserData> =
    new EventEmitter<UserData>();
  @Output() public onChange: EventEmitter<UserData> =
    new EventEmitter<UserData>();

  @Input()
  public btnLabel: string = 'COMMON_ENTER';

  @Input()
  public bodyWeight: number | undefined;
  @Input()
  public age: number | undefined;
  @Input()
  public height: number | undefined;
  @Input()
  public gender: string = 'M';
  @Input()
  public selectedActivityLevel: ActivityLevel | undefined;

  constructor(private readonly _userSettings: UserSettingsService) {}

  public scaleIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'weight-scale'],
  };
  public ageIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'cake-candles'],
  };

  public heightIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'ruler'],
  };

  public genderIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'venus-mars'],
  };

  public maleIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'mars'],
  };
  public femaleIcon: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'venus'],
  };

  public userDataForm: FormGroup = new FormGroup({});
  public activityLevels: ActivityLevel[] = [];

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
      bodyWeight: new FormControl(this.bodyWeight, [Validators.required]),
      age: new FormControl(this.age, [Validators.required]),
      height: new FormControl(this.height, [Validators.required]),
    });
    this.activityLevels = this._userSettings.getActivityLevels();
    if (!this.selectedActivityLevel) {
      this.selectedActivityLevel = this.activityLevels[0];
    }

    this.userDataForm.valueChanges.subscribe((form) => {
      this.onChange.emit(this.getData());
    });
  }

  public toggleGender(gender: string) {
    this.gender = gender;
    this.onChange.emit(this.getData());
  }

  public submit(): void {
    this.submitForm.emit(this.getData());
  }

  private getData(): UserData {
    return {
      bodyWeight: this.userDataForm.controls.bodyWeight.value,
      age: this.userDataForm.controls.age.value,
      height: this.userDataForm.controls.height.value,
      gender: this.gender,
      activityLevel: this.selectedActivityLevel!.id,
    };
  }

  public updateValues(userData: UserData) {
    this.userDataForm.controls.bodyWeight.patchValue(userData.bodyWeight);
    this.userDataForm.controls.age.patchValue(userData.age);
    this.userDataForm.controls.height.patchValue(userData.height);
    this.selectedActivityLevel = this.activityLevels.find(
      (x) => x.id === userData.activityLevel
    );
    this.gender = userData.gender;
  }

  public selectLevel(level: ActivityLevel) {
    this.selectedActivityLevel = level;
    this.onChange.emit(this.getData());
  }
}
