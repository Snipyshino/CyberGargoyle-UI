import {AfterViewInit, Component, OnChanges} from '@angular/core';
import AFRAME from 'aframe';

/**
 * Loop solution retreived from: https://github.com/aframevr/aframe/issues/2518#issuecomment-289450266
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, AfterViewInit {

  public scenery = 'https://i.imgur.com/1dUSMiM.jpg';

  public gOptions = {
    title: 'Company Performance',
  };

  public data = [
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540]
  ];


  public aframeGraphStub = [{
    id: '1', type: 'bar', dataPoints: '[\n' +
      '  {"x": 1, "y": 8, "z": 0, "size": 1, "color": "#ff0000"},\n' +
      '  {"x": -2, "y": 3, "z": 1, "size": 1.5, "color": "#00ff00"},\n' +
      '  {"x": -1, "y": 3, "z": 2, "size": 1, "color": "#0000ff"},\n' +
      '  {"x": 2, "y": 7, "z": 7, "size": 1.5, "color": "#0000ff"},\n' +
      '  {"x": 1, "y": 6, "z": 3, "size": 1, "color": "#4CC3D9"}\n' +
      ']  '
  }
    // , {
    //   id: '2', type: 'bar', dataPoints: [
    //     {x: 1, y: 8, z: 0, size: 1, color: '#aa0000'},
    //     {x: -2, y: 3, z: 1, size: 0.5, color: '#00aa00'},
    //     {x: -1, y: 3, z: 2, size: 1, color: '#0000aa'},
    //     {x: 2, y: 7, z: 7, size: 0.5, color: '#0000aa'},
    //     {x: 1, y: 6, z: 3, size: 1, color: '#d94cec'}
    //   ]
    // }
  ]; // TODO replace this with graphService

  ngOnChanges(): void {
    this.refresh();
  }

  private refresh() {
    const graphpanel: any = document.getElementById('graphPanel');
    graphpanel.flushToDOM();
  }

  ngAfterViewInit(): void {
    AFRAME.registerComponent('cursor-listener', {
      function() {
        this.el.addEventListener('click', this.refresh());
      }
    });
  }
}
