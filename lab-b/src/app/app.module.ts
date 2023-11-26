import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { RandomComponent } from './random/random.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RandomComponent,
    ListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
