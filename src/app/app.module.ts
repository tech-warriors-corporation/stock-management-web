import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLoadingModule } from "./core/full-loading/full-loading.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FullLoadingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}
