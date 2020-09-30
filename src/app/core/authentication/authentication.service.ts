import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../http/app-config.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private get apiUrl(){
    return this.appConfig.getConfig().rootApiUrl;
  }

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(args: { user: { email: string, password: string } }) {
    return this.http.post<any>(this.apiUrl + `/users/login`, args)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user.user && user.user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLogged(): any{

    return this.currentUser;
    
    // this.currentUser.toPromise()
    // .then(res => {
    //   if(res && res !== undefined){
    //     return true;
    //   }else{
    //     return false;
    //   }

    // },(error) => { return false; });
  }

}
