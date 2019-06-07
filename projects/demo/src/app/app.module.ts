import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatEditorModule } from 'mat-editor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
