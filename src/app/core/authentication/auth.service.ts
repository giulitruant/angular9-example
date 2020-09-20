import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { User, ChangePasswordModel } from './user.model';
import { SecurityService } from '../http/security.service';
import { TokenResponse } from '../http/model/auth.model';
import { MatSnackBarRef, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'https://conduit.productionready.io/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');

  constructor(private http: HttpClient){ }

  setLogginIn(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');

  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedInStatus') || this.loggedInStatus);

  }

  getUser(args: { user: { email: string, password: string } }){

    return this.http.post(this.apiUrl + 'users/login', args);
  }

}
