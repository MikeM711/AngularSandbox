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
  ninjas = {
    DB: [],
    Key: [],
  }
  updatedNinjas = {
    DB: [],
    Key: [],
  }
  keyDelete: any;
  bool = null;
  
  // lastNinja is just the snapshot
  // lastNinja:any;

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

  // Below updates web app AFTER name and belt data are added to Database
  fbGetData(){
    firebase.database().ref().on('child_added', (snapshot) => {
      this.ninjas.DB.push(snapshot.val())
      this.ninjas.Key.push(snapshot.key)
    })
  }

  fbUpdateData(){
    firebase.database().ref().on('child_removed', (oldChildSnapshot) => {
      // Below shows that the database knows a child has been removed with a snapshot of the particular child removal
      // console.log(oldChildSnapshot.key, 'child removed listener result')

      // iterating through ninjas array to find where the key is, and skip over it
      for(let i=0; i < this.ninjas.DB.length; i++){
        if(this.ninjas.Key[i] !== oldChildSnapshot.key){
          // console.log(this.ninjas[i], 'this.ninjas') - Ninja Keys
          this.updatedNinjas.DB.push(this.ninjas.DB[i])
          this.updatedNinjas.Key.push(this.ninjas.Key[i])
        }
      }
      // setting the old array equal to the array with the item we "skipped over"
      this.ninjas = this.updatedNinjas;

      // Dump out the updatedNinjas array to use for next time
      this.updatedNinjas = {
        DB: [],
        Key: [],
      }
      // console.log(this.ninjas, 'The new list!')
      // this.ninjas.pop(); // pops last ninja out of array

    })
  }

  // Below pushes name and belt data into the Database
  fbPostData(name, belt){
    firebase.database().ref('/').push({name: name, belt: belt});
  }

  // The function below (hooked up to the button) will delete any ninja in the Database
  fbDeleteData(nameDelete, beltDelete) {

    // Below is the user's name/belt delete request
    // console.log(nameDelete)
    // console.log(beltDelete)

    // setting everything to lowercase - therefore, no case-sensitivity
    nameDelete = nameDelete.toString().toLowerCase()
    beltDelete = beltDelete.toString().toLowerCase()

    // Function finds the database key in question that it must delete
    this.keyDelete = this.deleteKey(nameDelete, beltDelete);
    //console.log(this.keyDelete);

    // remove the child from the database
    firebase.database().ref('/').child(this.keyDelete).remove();

  }

  // deleteKey function goes in tandem with fbDeleteData
  // iterates through ninjas array to find the key related to the ninja/belt the user want to delete
  deleteKey = function (nameDelete, beltDelete) {
    for (let i = 0; i < this.ninjas.DB.length; i++) {
      if (this.ninjas.DB[i].name == nameDelete && this.ninjas.DB[i].belt == beltDelete) {
        return this.ninjas.Key[i]
      }
    }
  }
  
}
