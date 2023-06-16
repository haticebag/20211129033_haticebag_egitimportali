import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { FotoDialogComponent } from './components/dialogs/foto-dialog/foto-dialog.component';
import { OgrencilisteleComponent } from './components/ogrencilistele/ogrencilistele.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { DersComponent } from './components/ders/ders.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    OgrenciComponent,
    DersComponent,
    DerslisteleComponent,
    OgrencilisteleComponent,

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    DersDialogComponent,
    FotoDialogComponent,
    OgrsecDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    DersDialogComponent,
    FotoDialogComponent,
    OgrsecDialogComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
