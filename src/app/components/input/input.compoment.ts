import { SelectItem } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

import { NpmDataService } from '../../services/npm.data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  interval: SelectItem[];
  selectedInterval: string;

  values: string[];

  constructor(private _npmDataSerice: NpmDataService) {
    this.selectedInterval = 'last-month';
    this.interval = [
      { label: 'Day', value: 'last-day' },
      { label: 'Week', value: 'last-week' },
      { label: 'months', value: 'last-month' },
    ];
  }

  ngOnInit() {
  }

  search(): void {
    this._npmDataSerice.search(this.selectedInterval, this.values);
  }
  console(event): void {
    console.log(this.values, event);
  }
}
