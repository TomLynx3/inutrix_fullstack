"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSettingsService = void 0;
var core_1 = require("@angular/core");
var UserSettingsService = /** @class */ (function () {
    function UserSettingsService(_http) {
        this._http = _http;
        this._controllerURL = '/api/settings';
    }
    UserSettingsService.prototype.getUserSettings = function () {
        return this._http.get(this._controllerURL);
    };
    UserSettingsService.prototype.saveUserSettings = function (userData) {
        return this._http.post(this._controllerURL, userData);
    };
    UserSettingsService.prototype.getActivityLevels = function () {
        return [
            {
                name: 'USER_DATA_FORM_ACTIVITE_LEVEL_SEDENTARY_NAME',
                description: 'USER_DATA_FORM_ACTIVITE_LEVEL_SEDENTARY_DESCRIPTION'
            },
            {
                name: 'USER_DATA_FORM_ACTIVITE_LEVEL_LIGHTLYACTIVE_NAME',
                description: 'USER_DATA_FORM_ACTIVITE_LEVEL_LIGHTLYACTIVE_DESCRIPTION'
            },
            {
                name: 'USER_DATA_FORM_ACTIVITE_LEVEL_MODERATELYACTIVE_NAME',
                description: 'USER_DATA_FORM_ACTIVITE_LEVEL_MODERATELYACTIVE_DESCRIPTION'
            },
        ];
    };
    UserSettingsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserSettingsService);
    return UserSettingsService;
}());
exports.UserSettingsService = UserSettingsService;
// export enum ActivityLevel{
//   SEDENTARY,
//   LIGHTLYACTIVE,
//   MODERATELYACTIVE,
//   ACTIVE,
//   VERYACTIVE
// }
