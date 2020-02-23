import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input()
  public id;

  public type = 'bar'

  public dataPoints = [];

  constructor() { }

  ngOnInit() {
  }

}
