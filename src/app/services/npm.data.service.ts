import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { environment } from './../../environments/environment';
@Injectable()
export class NpmDataService {
  private API_PATH = environment.apiConfig.baseUrl;

  constructor(private http: Http) { }

  rangeLastMonth(queryPackage: string): Observable<Highcharts.Options> {
    const url = `${this.API_PATH}${environment.range.prefix}${environment.range.lastMonth}${queryPackage}`;

    return this.http.get(url)
      .map((res) => {
        const resJson: object = res.json();

        const chartObject: Highcharts.Options = {
          chart: {
            type: 'area'
          },
          title: {
            text: 'NPM STAT CHARTS'
          },
          subtitle: {
            text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
              'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
              'armscontrol.org</a>'
          },
          xAxis: {
            type: 'datetime',
          },
          yAxis: {
            title: {
              text: 'Nuclear weapon states'
            },
            labels: {
              formatter: function () {
                return this.value / 1000 + 'k';
              }
            }
          },
          tooltip: {
            pointFormat: '{series.name} downloaded <b>{point.y:,.0f}</b> times'
          },
          plotOptions: {
            area: {
              pointStart: Date.parse(resJson[_.keys(resJson)[0]].start),
              pointInterval: 24 * 3600 * 1000,
            }
          },
          series: this._seriesBuilder(resJson)
        };
        return chartObject;
      });
  }

  private _seriesBuilder(data: object): object[] {
    const keys: string[] = Object.keys(data);
    const series: object[] = [];

    keys.forEach((key) => {
      series.push({
        name: key,
        data: _.values(_.mapValues(data[key]['downloads'], (row) => _.get(row, 'downloads'))),
      });
    });
    return series;
  }



}
