import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { environment } from '../../environments/environment';

import { AddNpmData } from '../actions/npmdata.action';
import { AppState } from '../app.state';
import { Package } from '../interfaces/npm.interface';
import { NpmData } from '../models/npmdata.model';
import * as selectors from '../selectors/npmdata.selector';

@Injectable()
export class NpmDataService {
  private API_PATH = environment.apiConfig.baseUrl;
  private API_DETAILS_PATH = environment.detail;
  private _oldUrl: string;

  private _currentChart: BehaviorSubject<Highcharts.Options> = new BehaviorSubject<Highcharts.Options>(null);
  get currentChart(): Observable<Highcharts.Options> { return this._currentChart.asObservable(); }

  private _currentDetailChart: BehaviorSubject<object> = new BehaviorSubject<object>(null);
  get currentDetailChart(): Observable<object> { return this._currentDetailChart.asObservable(); }

  private _inputValidator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  get inputValidator(): Observable<boolean> { return this._inputValidator.asObservable(); }

  constructor(private http: Http, private store: Store<AppState>) {
    this._oldUrl = '';
  }

  range(type: string, values: string[]): void {

    const queryPackage: string = this._flatParam(values);
    const chartType = type === 'last-day' ? 'column' : 'area';
    const url = `${this.API_PATH}${environment.range.prefix}${type}/${queryPackage}`;
    const httpGet = [
      Observable.forkJoin(
        ...values.map(value => this.http.get(`${this.API_PATH}${environment.range.prefix}${type}/${value}`)
          .pipe(
            map((res) => {
              const resJson: object = res.json();
              const response: object = {};
              response[value] = resJson;
              return response;
            }),
            catchError((error) => {
              this._inputValidator.next(false);
              return of(`Bad Promise: ${error}`);
            })
          ))),
      Observable.forkJoin(
        ...values.map(value => this.http.get(`${this.API_DETAILS_PATH}${value}`)
          .pipe(
            map((res) => {
              return res.json().results[0];
            }),
            catchError((error) => {
              this._inputValidator.next(false);
              return of(`Bad Promise: ${error}`);
            })
          ))
      )
    ];

    this.store.select(selectors.getItemByUrl(url)).subscribe(
      (response: NpmData) => {
        if (response) {
          this._currentChart.next(response.data);
          if (!_.isEqual(this._oldUrl, url)) {
            this._currentDetailChart.next(response.details);
            this._oldUrl = url;
          }
        } else {

          Observable.forkJoin(httpGet).subscribe((res: any) => {
            if (typeof res[1] === 'string') {
              return;
            }
            const resJson: object = Object.assign({}, ...res[0]);

            const chartObject: Highcharts.Options = {
              chart: {
                type: chartType
              },
              title: {
                text: 'NPM STAT CHARTS'
              },
              subtitle: {
                text: 'Sources: <a href="https://api.npmjs.org/">api.npmjs.org</a>'
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
            const details = res[1];
            this.store.dispatch(new AddNpmData({ url: url, data: chartObject, details: details }));
            this._currentChart.next(chartObject);
            if (!_.isEqual(this._oldUrl, url)) {
              this._currentDetailChart.next(details);
              this._oldUrl = url;
            }
          });
        }
      },
      error => {
        console.log(error);
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
