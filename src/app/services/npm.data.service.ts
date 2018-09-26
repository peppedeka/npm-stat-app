import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as selectors from '../selectors/npmdata.selector';
import { NpmData } from './../models/npmdata.model';
import { AddNpmData } from './../actions/npmdata.action';
import * as _ from 'lodash';

import { environment } from './../../environments/environment';
import { AppState } from '../app.state';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NpmDataService {
  private API_PATH = environment.apiConfig.baseUrl;
  private API_DETAILS_PATH = environment.detail;

  private _currentChart: BehaviorSubject<Highcharts.Options> = new BehaviorSubject<Highcharts.Options>(null);
  get currentChart(): Observable<Highcharts.Options> { return this._currentChart.asObservable(); }

  private _currentDetailChart: BehaviorSubject<object> = new BehaviorSubject<object>(null);
  get currentDetailChart(): Observable<object> { return this._currentDetailChart.asObservable(); }

  constructor(private http: Http, private store: Store<AppState>) { }

  range(type: string, values: string[]): void {
    const queryPackage: string = this._flatParam(values);
    const url = `${this.API_PATH}${environment.range.prefix}${type}/${queryPackage}`;
    const httpGet = [this.http.get(url), ...values.map(p => this.http.get(`${this.API_DETAILS_PATH}${p}`))];

    this.store.select(selectors.getItemByUrl(url)).subscribe((response: NpmData) => {
      if (response) {
        this._currentChart.next(response.data);
        this._currentDetailChart.next(response.details);
      }
    });
    Observable.forkJoin(httpGet).subscribe((res) => {
      const resJson: object = res[0].json();

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
            text: 'Number of downloads'
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
            pointStart: resJson[_.keys(resJson)[0]] === null ? 0 : Date.parse(resJson[_.keys(resJson)[0]].start),
            pointInterval: 24 * 3600 * 1000,
          }
        },
        series: this._seriesBuilder(resJson)
      };
      res.shift();
      const details = res.map((row) => row.json()[0]);
      this.store.dispatch(new AddNpmData({ url: url, data: chartObject, details: details }));
      this._currentChart.next(chartObject);
      this._currentDetailChart.next(details);
    });
  }

  search(type: string, values: string[]) {
    this.range(type, values);
  }

  private _seriesBuilder(data: object): object[] {
    const keys: string[] = Object.keys(data).filter((key) => key !== '');
    const series: object[] = [];

    keys.forEach((key) => {
      series.push({
        name: key,
        data: data[key] === null ? [] : _.values(_.mapValues(data[key]['downloads'], (row) => _.get(row, 'downloads'))),
      });
    });
    return series;
  }

  private _flatParam(values: string[]): string {
    let flatParam = '';
    values.forEach((value) => {
      flatParam += value + ',';
    });
    return flatParam;
  }



}
