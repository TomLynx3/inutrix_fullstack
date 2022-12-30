import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { CustomIconModule } from "@ibabylondev/custom-icon";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { UserDataFormComponent } from "src/app/components/user-data-form/user-data-form.component";
import { DropdownDirective } from "src/app/directives/dropdown.directive";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MomentPipe } from "src/app/utilities/pipes/moment.pipe";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpLoaderFactory } from "src/app/app.module";
import { SwiperModule } from "swiper/angular";
@NgModule({
  declarations: [
    DropdownDirective,
    UserDataFormComponent,
    ConfirmationDialogComponent,
    MomentPipe,
  ],

  imports: [
    MatDialogModule,
    CommonModule,
    CustomIconModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      isolate: false,
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],

  exports: [
    CustomIconModule,
    ReactiveFormsModule,
    DropdownDirective,
    UserDataFormComponent,
    ConfirmationDialogComponent,
    MatDialogModule,
    MomentPipe,
    TranslateModule,
    SwiperModule,
  ],
})
export class SharedModule {}
