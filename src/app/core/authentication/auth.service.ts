import { Injectable } from '@angular/core';
import { User, ChangePasswordModel } from './user.model';
import { SecurityService } from '../http/security.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  private apiUrl = 'https://conduit.productionready.io/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('currentUser') || 'false');

  constructor(
    private http: HttpClient,
    private securityService: SecurityService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setLogginIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');

  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser') || this.loggedInStatus);

  }

  getUser(args: { user: { email: string, password: string } }) {

    return this.http.post<any>(this.apiUrl + 'users/login', args)
    .pipe(map( resp => {

      if (resp.user && resp.user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(resp.user));
        this.currentUserSubject.next(resp.user);
      }
      return resp.user;

    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
