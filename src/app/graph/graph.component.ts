import {AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';
import * as faker from 'faker';
import {Entity} from 'aframe';
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy, AfterContentInit {
  public scenery = 'https://i.imgur.com/1dUSMiM.jpg'; // A spherical image of space to fallback on

  private year = 2008;

  public dataEvent = new BehaviorSubject(this.getData());
  private graphs: any[];

  private refresh() {
    document.querySelector('[graphEmbed]').components.htmlembed.forceRender();
    console.log(this.graphs[0].data);
  }

  public graphReady() {
    console.log('Graph ready');
  }

  ngOnInit(): void {
    AFRAME.registerComponent('graphEmbed', {
      dependencies: ['htmlembed'],
      // init() {
      //   this.system.registerGraph(this.el);
      // },
      // remove() {
      //   this.system.unregisterGraph(this.el);
      // }
    });

    AFRAME.registerSystem('graphEmbed', {
      // init: () => {
      //   this.graphs = [];
      // },
      // registerGraph: (graph) => {
      //   this.graphs.push(graph);
      // },
      // unregisterGraph: (graph) => {
      //   const index = this.graphs.indexOf(graph);
      //   this.graphs.splice(index, 1);
      // }
    });
  }

  ngOnDestroy(): void {
    this.dataEvent.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.addGraph();

    this.dataEvent.pipe(delay(3000)).subscribe((newData) => {
      console.log(newData);
      console.log(Date.now());
      this.graphs[0].data.push(newData);
      this.refresh();
      console.log(this.graphs);
      if (this.year < 2020) {
        this.emitData();
      } else {
        this.dataEvent.complete();
      }
    });

    setTimeout(() => this.emitData(), 3000);
  }

  private emitData() {
    this.dataEvent.next(this.getData());
  }

  private getData() {
    const data = [this.year.toString(), faker.random.number(10000), faker.random.number(10000)];
    this.year++;
    return data;
  }

  public addGraph() {
    this.graphs.push({
      gOptions: {
        title: faker.company.bs(),
      },
      type: 'AreaChart',
      data: [
        ['2004', faker.random.number(10000), faker.random.number(10000)],
        ['2005', faker.random.number(10000), faker.random.number(10000)],
        ['2006', faker.random.number(10000), faker.random.number(10000)],
        ['2007', faker.random.number(10000), faker.random.number(10000)]
      ]
    });
  }
}
