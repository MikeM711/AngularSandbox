import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// imports & component decorator stuff
export class HomeComponent implements OnInit {
  homeTitle = "Welcome to the SICK directory...";

  constructor() { }

  ngOnInit() {
  }

}
