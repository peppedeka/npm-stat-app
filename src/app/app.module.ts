import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/npmdata.reducer';

import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';


import { AppComponent } from './app.component';
import { InputComponent, ChartComponent, DetailComponent } from './components/index';
import { NpmDataService } from './services/npm.data.service';



@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    InputComponent,
    DetailComponent
  ],
  imports: [
    ChipsModule,
    ButtonModule,
    CardModule,
    TableModule,
    PanelModule,
    SelectButtonModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    StoreModule.forRoot({
      npmData: reducer
    }),
  ],
  providers: [NpmDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
