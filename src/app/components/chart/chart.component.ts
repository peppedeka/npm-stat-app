import 'rxjs/add/operator/filter';

import * as Highcharts from 'highcharts';
import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { NpmDataService } from '../../services/npm.data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  currentChart: Highcharts.Options;

  private _visible: boolean;
  get visible(): boolean {
    return this._visible;
  }

  constructor(private _npmDataSerice: NpmDataService) {
    this._visible = false;
  }

  ngOnInit() {
    this._npmDataSerice.currentChart
      .filter(c => c != null)
      .subscribe((_currentChart) => {
        this.currentChart = _currentChart;
        if (this.currentChart.series[0].data.length > 0) {
          this._visible = true;
        } else {
          this._visible = false;
        }
        Highcharts.chart('container', _currentChart);
      });
  }
}
