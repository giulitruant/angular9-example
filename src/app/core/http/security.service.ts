import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as _ from 'lodash';
import { User, ChangePasswordModel } from '../authentication/user.model';
import { AppConfigService } from './app-config.service';
import { TokenResponse } from './model/auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  get rootUrl(){
    return this.configService.getConfig().rootUrl;
  }

  constructor(
    private configService: AppConfigService,
    private http: HttpClient
    ) {
  }

  login(user: User): Observable<User> {

    const args = {
      email: user.email,
      password: user.password
    };

    return this.http.post(this.rootUrl + '/users/login', args).pipe(map((res: User) => {
      return res;
    }));

  }

  refresh(refreshToken: string, token: string): Observable<TokenResponse> {
    const body = `client_id=QBS&grant_type=refresh_token&refresh_token=${refreshToken}`;
    const url = this.rootUrl + 'authenticate';

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})
    };

    httpOptions.headers.append('Authorization', `Bearer ${token}`);

    return this.http.post(url, body, httpOptions)
      .pipe(map((res: TokenResponse) => {
        return res;
      }));
  }

  user(userId: string): Observable<any> {

    if (!userId){
      return;

    }

    return this.http.get(`${this.rootUrl}user/${userId}`)
      .pipe(res => {
        return res;
      });
  }

  changePassword(changePassword: ChangePasswordModel): Observable<any> {

    return this.http.post(this.rootUrl + "changePassword", {
      Password: changePassword.password,
      NewPassword: changePassword.newPassword
    })
      .pipe(res => {
        return res;
      });
  }
}
