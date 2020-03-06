import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public type: 'bar'|'pie' = 'bar';

  public dataPoints: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
