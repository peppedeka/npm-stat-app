import * as Highcharts from 'highcharts';

import { Component, OnInit } from '@angular/core';

import { NpmDataService } from '../../services/npm.data.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  currentChart: Highcharts.Options;

  constructor(private _npmDataSerice: NpmDataService) {

  }

  ngOnInit() {
    this._npmDataSerice.currentChart
    .filter(c => c != null)
    .subscribe((_currentChart) => {
      this.currentChart = _currentChart;
      Highcharts.chart('container', _currentChart);
    });
  }
}
