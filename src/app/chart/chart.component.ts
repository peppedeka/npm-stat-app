import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NpmDataService } from '../services/npm.data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private _npmDataSerice: NpmDataService) {}

  ngOnInit() {
    this._npmDataSerice.rangeLastMonth('react,vue,angular').subscribe((res) => Highcharts.chart('container', res));
  }

}
