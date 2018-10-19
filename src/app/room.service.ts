import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Room } from './room';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RoomService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

    private roomsUrl = 'https://apps.lib.kth.se/webservices/mrbs/api/v1';

    getRoomsforarea(areaid: number): Observable<any[]> {
    const url = `${this.roomsUrl}/noauth/rooms/?area_id=${areaid}`;
    console.log("url: " + url);
      return this.http.get<any[]>(url)
      .pipe(
        //tap(rooms => this.log(`fetched rooms areaid=${areaid}`)),
        catchError(this.handleError(`getRoomsforarea id=${areaid}`, []))
      )
    }

    getBookingsforweek(areaid: number, date: string): Observable<any[]> {
      const url = `${this.roomsUrl}/bookings/${areaid}?startdate=${date}&bookingdays=6`;
      //console.log("url: " + url);
      return this.http.get<any[]>(url)
      .pipe(
        //tap(rooms => this.log(`fetched bookings areaid=${areaid}`)),
        catchError(this.handleError(`getBookingsforweek id=${areaid}`, []))
      )
    }

    getCurrentAvailableRooms(areaid: number, date: string): Observable<any[]> {
      //https://apps.lib.kth.se/webservices/mrbs/v1/rooms/2?bookingstatus=free&startdate=2018-01-31
      //const url = `${this.roomsUrl}/bookings/${areaid}?startdate=${date}&bookingstatus=all&bookingdays=1`;
      const url = `${this.roomsUrl}/getroombookings/?area_id=${areaid}&bookingdate=${date}&bookingstatus=free`;
      //console.log("url: " + url);
      return this.http.get<any[]>(url)
      .pipe(
        //tap(rooms => this.log(`fetched bookings areaid=${areaid}`)),
        catchError(this.handleError(`getCurrentAvailableRooms id=${areaid}`, []))
      )
    }

    getRoom(roomid: number): Observable<Room> {
      const url = `${this.roomsUrl}/rooms/${roomid}`;
      return this.http.get<Room>(url).pipe(
        //tap(_ => this.log(`fetched room id=${roomid}`)),
        catchError(this.handleError<Room>(`getRoom id=${roomid}`))
      )
    }

    private log(message: string) {
      this.messageService.add('RoomService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
