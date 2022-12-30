// import { HttpClient } from "@angular/common/http";
// import { Injectable, EventEmitter } from "@angular/core";
// import { TranslateLoader } from "@ngx-translate/core";
// import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// import { Observable } from "rxjs";
// import { Observer } from "rxjs";
// import { environment } from "../../../environments/environment";
// @Injectable()
// export class TranslationLoader implements TranslateLoader {
//   public onFetched: EventEmitter<void>;
//   private _en: any = {};
//   constructor(private _http:HttpClient) {

//     this.onFetched = new EventEmitter<void>();
//     if (environment.production) {
//       // this.loadTranslation(Root('/api/misc/alltranslates')).then((tran) => {
//       //   this.mergeTranslationData('en', JSON.parse(tran.en));
//       //   this.mergeTranslationData('es', JSON.parse(tran.es));
//       //   this.mergeTranslationData('fr', JSON.parse(tran.fr));
//       // });
//         return new TranslateHttpLoader(_http, './assets/i18n/', '.json');
//     }
//     this.loadTranslation(require("./translations/common.en.json")).then(
//       (en) => {
//         this.mergeTranslationData("en", en);
//       }
//     );
//     this.loadTranslation(require("./translations/lookups.en.json")).then(
//       (en) => {
//         this.mergeTranslationData("en", en);
//       }
//     // );

//     // this.loadTranslation(require('./errors/errors.en.json')).then((en) => {
//     //   this.mergeTranslationData('en', en);
//     // });
//     // this.loadTranslation(require('../../../assets/i18n/common.lv.json')).then(
//     //   (lv) => {
//     //     this.mergeTranslationData('lv', lv);
//     //   }
//     // );
//     // this.loadTranslation(require('../../../assets/i18n/common.fr.json')).then(
//     //   (fr) => {
//     //     this.mergeTranslationData('fr', fr);
//     //   }
//     // );

//   }

//   public extend(lang: string, translation: any) {

//     if (!environment.production) {
//       if ((<any>window).translateService.currentLang) {
//         if ((<any>window).translateService.currentLang === lang) {
//           this.loadTranslation(translation).then((res) => {
//             this.mergeTranslationData(lang, res);
//           });
//         }
//       } else {
//         this.loadTranslation(translation).then((res) => {
//           this.mergeTranslationData(lang, res);
//         });
//       }
//     }
//   }

//   public getTranslation(lang: string): Observable<any> {
//     return Observable.create((observer: Observer<string>) => {
//       observer.next(this.getTranslationByLang(lang));
//       observer.complete();
//     });
//   }

//   private loadTranslation(translation: string): Promise<any> {

//     if (typeof translation !== "string") {
//       return Promise.resolve(translation);
//     }
//     return new Promise((resolve, reject) => {
//       fetch(translation)
//         .then((data) => {
//           data.json().then((result) => {
//             resolve(result);
//           });
//         })
//         .catch((reason) => {
//           console.log("translate fetch failed", reason);
//         });
//     });
//   }

//   private mergeTranslationData(lang: string, data: any): void {
//     (<any>window).translateService.setTranslation(lang, data, true);
//     this.onFetched.emit();
//   }

//   private getTranslationByLang(lang: string): any {
//     switch (lang) {
//       case "en":
//         return this._en;
//       default:
//         return this._en;
//     }
//   }
// }
