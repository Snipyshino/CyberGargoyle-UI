import {AfterContentInit, AfterViewInit, Component, OnChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';
import * as faker from 'faker';
import {Entity} from 'aframe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
    public scenery = 'https://i.imgur.com/1dUSMiM.jpg';

    public gOptions = {
        title: 'Sales of potato',
    };

    public data = [
        ['2004', 1000, 2004],
        ['2005', 3170, 2400],
        ['2006', 6600, 8000],
        ['2007', 7030, 4010]
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

    private year = 2008;
    public dataEvent = new BehaviorSubject(this.getData());

    private refresh() {
        const graphEntity: Entity = document.querySelector('graphEntity');
        graphEntity.flushToDOM();
    }

    ngAfterContentInit(): void {
        this.dataEvent.pipe(delay(3000)).subscribe((newData) => {
            this.data.push(newData);
            this.refresh();
            if (this.year < 2020) {
                this.updateData();
            } else {
                this.dataEvent.complete();
            }
        });

        setTimeout(() => this.updateData(), 3000);
    }

    private updateData() {
        this.dataEvent.next(this.getData());
        this.year++;
    }

    private getData() {
        return [this.year.toString(), faker.random.number(10000), faker.random.number(10000)];
    }
}
