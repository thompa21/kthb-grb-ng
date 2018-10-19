import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsComponent }      from './rooms/rooms.component';
import { RoomsFreeComponent }      from './rooms-free/rooms-free.component';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '', component: RoomsComponent, canActivate: [AuthGuard] },

  //{ path: '', component: RoomsComponent },
  //{ path: 'freerooms', component: RoomsFreeComponent },
  { path: '', component: RoomsFreeComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
  
 }
