import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import {
    ChartComponent, DetailComponent, InputComponent, IntroComponent
} from './components/index';
import { reducer } from './reducers/npmdata.reducer';
import { NpmDataService } from './services/npm.data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    InputComponent,
    DetailComponent,
    IntroComponent
  ],
  imports: [
    ChipsModule,
    ButtonModule,
    ToastModule,
    FieldsetModule,
    CardModule,
    TableModule,
    PanelModule,
    ProgressBarModule,
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
  providers: [NpmDataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
