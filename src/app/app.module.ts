import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { NpmDataService } from './services/npm.data.service';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [NpmDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
