import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@shared/shared.module';
import { InterceptorProviders } from '@interceptors/index';

import { AppComponent } from './app.component';
import { NavigationComponent, LoaderComponent } from '@components/common/';
import { ToastComponent } from '@common/toast/toast.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoaderComponent,
        ToastComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatButtonModule,
        AppRoutingModule
    ],
    providers: [ InterceptorProviders ],
    bootstrap: [AppComponent]
})
export class AppModule { }
