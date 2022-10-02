import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { NgxSnakeToCamelModule } from "ngx-snake-to-camel";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLoadingModule } from "./core/full-loading/full-loading.module";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { LayoutModule } from "./core/layout/layout.module";

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
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule{}
