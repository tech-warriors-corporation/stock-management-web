import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";

import { NgxSnakeToCamelModule } from "ngx-snake-to-camel";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLoadingModule } from "./core/full-loading/full-loading.module";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { LayoutModule } from "./core/layout/layout.module";
import { SupportModule } from "./core/support/support.module";
import { UsersModule } from "./modules/users/users.module";
import { Lang } from "./shared/enums/lang";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullLoadingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        NgxSnakeToCamelModule.forRoot(),
        LayoutModule,
        SupportModule,
        UsersModule,
        MatNativeDateModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: Lang.PT_BR
        },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { strict: true, useUtc: false },
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {},
                display: {
                    dateA11yLabel: 'LL'
                },
            },
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule{}
