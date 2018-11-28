import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggingService } from '../logging.service';
import { DataService } from '../data.service';
declare var firebase: any;

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
})
export class DirectoryComponent implements OnInit {
  ninjas:any = [];
  bool = null;

  // lastNinja is just the snapshot
  lastNinja:any;

  constructor(private logger: LoggingService, private dataService: DataService) { }

  logIt(){
    this.logger.log();
  }

  ngOnInit() {
    // Commenting below out because we would like to use the Firebase API instead
    // We do this so that we can get data AND post data to our Database
    /*this.dataService.fetchData().subscribe(
      (data) => this.ninjas = data
    );*/
    this.fbGetData();
    this.fbUpdateData(); 
  }

  fbGetData(){
    firebase.database().ref().on('child_added', (snapshot) => {
      this.ninjas.push(snapshot.val());
      //console.log(snapshot.val())
      this.lastNinja = snapshot
    })
  }

  fbUpdateData(){
    firebase.database().ref().on('child_removed', (oldChildSnapshot) => {
      //this.ninjas.push(oldChildSnapshot.val());
      console.log(oldChildSnapshot.val())
      this.ninjas.pop();
    })
  }

  fbPostData(name, belt){
    firebase.database().ref('/').push({name: name, belt: belt});
  }

  // The function below (hooked up to the button) will delete the last ninja in the Database
  
  fbDeleteData() {
    // console.log(this.lastNinja.key)
    firebase.database().ref('/').child(this.lastNinja.key).remove();
 
  }
  
}
