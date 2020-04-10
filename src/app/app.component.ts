import {AfterContentInit, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {delay} from 'rxjs/operators';
import * as faker from 'faker';
import {Entity} from 'aframe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public vrOn = false;


}
