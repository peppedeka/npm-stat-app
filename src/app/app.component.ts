import { Component, OnInit } from '@angular/core';

import { NpmDataService } from './services/npm.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  private _visible: boolean;
  get visible(): boolean {
    return this._visible;
  }
  constructor(private _npmDataSerice: NpmDataService) {
    this._visible = false;
  }

  ngOnInit() {
    this._npmDataSerice.currentChart
      .subscribe((_currentChart: Highcharts.Options) => {
        if (_currentChart === null) {
          this._visible = false;
        } else {
          this._visible = true;
        }
      });
  }
}
