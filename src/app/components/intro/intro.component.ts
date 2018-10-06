import 'fabric';
import 'rxjs/add/observable/interval';

import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NpmDataService } from '../../services/npm.data.service';

declare const fabric: any;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroComponent implements OnInit {

  private _canvas: any;
  private _text: string;

  textFabric: any;

  constructor(private _npmDataSerice: NpmDataService) {
    this._text = 'npm-stat';

    this.textFabric = new fabric.Text(this._text, {
      fontSize: 300,
      left: 0,
      right: 0,
      top: 0,
      lineHeight: 4,
      stroke: 'red',
      strokeWidth: 2,
      originX: 'left',
      fontFamily: 'Helvetica',
      textShadow: 'green 1px 15px 4px',
      fontWeight: 'bold',
      statefullCache: true,
      selectable: false,
      scaleX: 0.8,
      scaleY: 0.8
    });

  }

  loadPattern(url) {
    fabric.util.loadImage(url, (img) => {
      this.textFabric.set('fill', new fabric.Pattern({
        source: img,
        repeat: 'repeat'
      }));

      this._canvas.onBeforeScaleRotate = function lock(object) {
        object.lockScaling = true;
      };
      this._canvas.selection = false; // disable group selection
      this._canvas.renderAll();
    });
  }

  ngOnInit() {
    this._canvas = new fabric.Canvas('c', {
      selection: false
    });
    // this._canvas.width  = window.innerWidth;
    this.textFabric.setColor('red');
    this._canvas.add(this.textFabric);
    this._canvas.renderAll();
    const randomNumber: number = Math.floor(Math.random() * 6) + 1 ;
    this.loadPattern(`../../../assets/${randomNumber}.png`);
    Observable.interval(1000).subscribe(() => {
      this.loadPattern(`../../../assets/${Math.floor(Math.random() * 6) + 1}.png`);
    })
  }
}

