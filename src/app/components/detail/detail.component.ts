import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NpmDataService } from '../../services/npm.data.service';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { NpmResponse } from '../../interfaces/npm.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {

  currentChartDetail: NpmResponse[] = [];
  colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
    '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']
  constructor(private _npmDataSerice: NpmDataService) {
    this._npmDataSerice.currentDetailChart
      .filter(c => c != null)
      .subscribe((_currentDetailChart: NpmResponse[]) => {
        this.currentChartDetail = _currentDetailChart;

      });
  }
  clean(value: string): string {
    return value.replace('<em>', '').replace('</em>', '');
  }
  serColor() {
    return 'redColoredPanel';
  }

  ngOnInit() {
  }

}
