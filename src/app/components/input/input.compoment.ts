import { MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs/Observable';

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
  inputValidator: Observable<boolean>;

  constructor(private _npmDataSerice: NpmDataService, private _messageService: MessageService) {
    this.values = [];
    this.selectedInterval = 'last-month';
    this.interval = [
      { label: 'Day', value: 'last-day' },
      { label: 'Week', value: 'last-week' },
      { label: 'months', value: 'last-month' },
    ];
    this._npmDataSerice.inputValidator.subscribe((valid: boolean) => {
      if (!valid) {
        this._messageService.add({ severity: 'error', summary: 'Ops package not found', detail: this.values.pop() });
      }
    });
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
