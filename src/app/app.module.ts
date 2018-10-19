import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomService } from './room.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { RoomsFreeComponent } from './rooms-free/rooms-free.component';

import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
/*
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
*/

import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    MessagesComponent,
    RoomsFreeComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [
    RoomService, 
    MessageService,
    AuthGuard,
    AuthenticationService,
    UserService
    // providers used to create fake backend
    /*
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
    */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
