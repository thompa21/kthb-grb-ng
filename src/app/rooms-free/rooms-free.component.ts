import { Component, OnInit } from '@angular/core';

import { RoomService } from '../room.service';

@Component({
  selector: 'app-rooms-free',
  templateUrl: './rooms-free.component.html',
  styleUrls: ['./rooms-free.component.css']
})
export class RoomsFreeComponent implements OnInit {

  constructor(
    private roomService: RoomService
  ) { 

  }

  bookings;
  rooms;
  currenthour: string;
  nexthour: string;
  interval;
  currentdate;
  currentroomstatus: any[];

  ngOnInit() {
    var d = new Date();
    var n = d.getHours();
    //this.currenthour = "08"; //this.addZero(d.getHours());
    this.currenthour = this.addZero(d.getHours());
    this.nexthour = this.addZero(d.getHours() + 1);
    //this.currentdate = "2018-01-29"; //new Date().toISOString().slice(0,10);
    this.currentdate = new Date().toISOString().slice(0,10);
    this.getRoomsforarea(2);
    //this.getCurrentAvailableRooms(2, "2017-11-24", "11")
    this.getCurrentAvailableRooms(2)
    this.interval = setInterval(() => { 
      //this.getCurrentAvailableRooms(2, "2017-11-24", "11")
      this.getCurrentAvailableRooms(2)
    }, 5000);
  }

  addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }

  getRoomsforarea(areaid: number): void {
    this.roomService.getRoomsforarea(areaid)
    .subscribe(res => {
        //console.dir(res);
        this.rooms = res;
      });
  }

  getCurrentAvailableRooms(areaid: number): void {
    var roomname;
    var status;
    var d = new Date();
    var n = d.getHours();
    this.currenthour = this.addZero(d.getHours());
    this.nexthour = this.addZero(d.getHours() + 1);
    this.currentdate = new Date().toISOString().slice(0,10);
    this.roomService.getCurrentAvailableRooms(areaid, this.currentdate)
    .subscribe(res => {
        this.currentroomstatus = [];
        
        this.bookings = res;
        //console.log(this.bookings.rooms);
        //console.log(this.currentdate + ' ' + this.currenthour);
        this.rooms = this.bookings;
        //kolla om rum är ledigt just nu
        //console.log(this.bookings.length);
        for(var i=0;i<this.rooms.length;i++){
          //console.log(this.bookings[i].date);
          if ( this.rooms[i].date == this.currentdate) {
              //console.log(this.bookings[i].rooms[j].bookings.length);
              roomname = this.rooms[i].roomname;
              status = "busy";
              for(var k=0;k<this.rooms[i].bookings.length;k++){
                if (this.rooms[i].bookings[k].hour == this.currenthour) {
                  //console.log(this.bookings[i].rooms[j].roomname);
                  console.log(this.bookings[i].bookings[k].status);
                  status = this.rooms[i].bookings[k].status;
                  //console.log(this.currentroomstatus);
                  break;
                }
              }
              console.log(status);
              if (status == "free") {

                this.currentroomstatus.push({"roomname": roomname, "status": status});
              }
          }
        }
      });
  }

}
