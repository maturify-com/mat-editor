import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatModuleModule } from 'mat-editor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
