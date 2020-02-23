import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input()
  public id;

  @Input()
  public type = 'bar'

  @Input()
  public dataPoints = [];

  constructor() { }

  ngOnInit() {
  }

}
