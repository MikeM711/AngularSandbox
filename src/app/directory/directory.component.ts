import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
})
export class DirectoryComponent implements OnInit {
  ninjas = [
    {name: "Yoshi", belt: "Black"},
    {name: "Ryu", belt: "Red"},
    {name: "Crystal", belt: "Purple"},
  ];

  constructor() { 
  }
  ngOnInit() {
  }

}
