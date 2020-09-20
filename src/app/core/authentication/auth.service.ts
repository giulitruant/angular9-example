import { Injectable } from '@angular/core';


import { User, ChangePasswordModel } from './user.model';
import { SecurityService } from '../http/security.service';
import { TokenResponse } from '../http/model/auth.model';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfigService } from '../http/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private apiUrl = this.apiService;

  //private apiUrl = 'https://conduit.productionready.io/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false');

  constructor(
    private http: HttpClient,
    private apiService: AppConfigService
    ){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  setLogginIn(value: boolean){
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  login(args: { user: { email: string, password: string } }){

    return this.http.post<any>(this.apiUrl + 'users/login', args)
    .pipe(map(user => {
      if(user && user.token){
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;

      }

      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}


}
