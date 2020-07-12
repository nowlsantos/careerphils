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
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '@shared/shared.module';
import { InterceptorProviders } from '@services/interceptors/index';

import { AppComponent } from './app.component';
import { NavigationComponent, LoaderComponent } from '@components/common/';
import { ToastComponent } from '@common/toast/toast.component';
import { DialogComponent } from '@components/dialog/dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoaderComponent,
        ToastComponent,
        DialogComponent
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
        MatDialogModule,
        AppRoutingModule
    ],
    providers: [ InterceptorProviders ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// ng generate module orders --route orders --module app.module
