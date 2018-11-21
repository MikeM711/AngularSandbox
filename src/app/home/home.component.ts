import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// imports & component decorator stuff
export class HomeComponent implements OnInit {
  homeTitle = "Welcome to the SICK directory...";

  @Input() ninjaProperty;

  constructor() { }

  ngOnInit() {
  }

}
