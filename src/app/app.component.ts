import { Observable } from 'rxjs/Observable';

import { Component } from '@angular/core';

import { NpmDataService } from './services/npm.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  _hidden: Observable<boolean>;
  get hidden(): Observable<boolean> {
    return this._hidden;
  }

  constructor(private _npmDataSerice: NpmDataService) {
    this._hidden = this._npmDataSerice.hidden;
  }
}
