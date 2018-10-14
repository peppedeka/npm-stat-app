import { MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs/Observable';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LastFrom } from '../../interfaces/input.interface';
import { NpmDataService } from '../../services/npm.data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

  interval: SelectItem[];
  selectedInterval: string;

  values: string[];
  inputValidator: Observable<boolean>;

  constructor(private _npmDataSerice: NpmDataService, private _messageService: MessageService) {
    this.values = [];
    this.selectedInterval = 'last-month';
    this.interval = [
      { label: 'Day', value: 'last-day' },
      { label: 'Week', value: 'last-week' },
      { label: 'Month', value: 'last-month' },
      { label: '6 months', value: this.calculateLastFromDate({ range: 'month', value: 6 }) },
      { label: 'Year', value: this.calculateLastFromDate({ range: 'day', value: 364 }) },
      { label: '2 Year', value: this.calculateLastFromDate({ range: 'year', value: 2 }) }
    ];
    this._npmDataSerice.inputValidator.subscribe((valid: boolean) => {
      if (!valid) {
        this._messageService.add({ severity: 'error', summary: 'Ops package not found', detail: this.values.pop() });
      }
    });
  }

  search(): void {
    this._npmDataSerice.search(this.selectedInterval, this.values);
  }
  console(event): void {
    console.log(this.values, event);
  }

  calculateLastFromDate(range: LastFrom): string {
    const now = new Date();
    const lastDate = new Date();

    switch (range.range) {
      case 'year':
      default:
        lastDate.setFullYear(now.getFullYear() - range.value);
        break;
      case 'month':
        lastDate.setMonth(now.getMonth() - range.value);
        break;
      case 'day':
        lastDate.setDate(now.getDate() - range.value);
        break;
    }

    return `${lastDate.getFullYear()}-${lastDate.getMonth()}-${lastDate.getDate()}:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }
}
