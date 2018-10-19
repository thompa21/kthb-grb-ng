import { Component, OnInit } from '@angular/core';

import { RoomService } from '../room.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomService) { }
  
  room;
  rooms: any[];
  currentroomstatus: any[];
  bookings: any[];
  interval;
  currenthour: string;
  currentdate: string;

  ngOnInit() {
    var d = new Date();
    var n = d.getHours();
    this.currenthour = this.addZero(d.getHours());
    this.currentdate = new Date().toISOString().slice(0,10);
    //console.log(this.currentdate);
    this.getRoomsforarea(2);
    this.getBookingsforweek(2,this.currentdate);
    //this.getBookingsforweek(2,"2017-11-23");
    
    this.interval = setInterval(() => { 
      this.getBookingsforweek(2,this.currentdate); 
      //this.getBookingsforweek(2,"2017-11-23");
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

  getBookingsforweek(areaid: number, date: string): void {
    this.roomService.getBookingsforweek(areaid, date)
    .subscribe(res => {
        this.currentroomstatus = [];
        //console.dir(res);
        this.bookings = res;
        //kolla om rum är ledigt just nu
        //console.log(this.bookings.length);
        for(var i=0;i<this.bookings.length;i++){
          //console.log(this.bookings[i].date);
          if ( this.bookings[i].date == this.currentdate) {
            //console.log(this.bookings[i].rooms.length);
            for(var j=0;j<this.bookings[i].rooms.length;j++){
              //console.log(this.bookings[i].rooms[j].bookings.length);
              for(var k=0;k<this.bookings[i].rooms[j].bookings.length;k++){
                if (this.bookings[i].rooms[j].bookings[k].hour == this.currenthour) {
                  //console.log(this.bookings[i].rooms[j].roomname);
                  //console.log(this.bookings[i].rooms[j].bookings[k].status);
                  this.currentroomstatus.push({"room": this.bookings[i].rooms[j].roomname, "status": this.bookings[i].rooms[j].bookings[k].status});
                  //console.log(this.currentroomstatus);
                }
              }
            }
          }
        }
      });
  }

  getRoom(roomid: number): void {
    this.roomService.getRoom(roomid)
    .subscribe(room => this.room = room);
  }

  add(id){

  }

  delete(id){

  }

}
