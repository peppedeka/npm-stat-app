import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NpmResponse } from '../../interfaces/npm.interface';
import { NpmDataService } from '../../services/npm.data.service';

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
  getValue(value: number): number {
    return Math.trunc(value * 100);
  }

  ngOnInit() {
  }

}
