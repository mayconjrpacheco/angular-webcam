import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularWebcamModule } from 'projects/angular-webcam/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularWebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
