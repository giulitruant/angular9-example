import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { User, ChangePasswordModel } from './user.model';
import { SecurityService } from '../http/security.service';
import { TokenResponse } from '../http/model/auth.model';
import { MatSnackBarRef, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static advisorTimer: Observable<number>;
  static logoutTimer: Observable<number>;
  static advisorCounter: Subscription;
  static logoutCounter: Subscription;

  private session = window.localStorage;

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    var accessToken = this.getToken();

    if (accessToken)
    this.loggedIn.next(true);
    else
      this.loggedIn.next(false);

    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private securityService: SecurityService
  ) {
  }

  private configSucces: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['style-succes'],
  };

  private configInfo: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['style-info'],
  };

  private configWarning: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['style-warning'],
  };

  private configError: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['style-error'],
  };

  getToken() {
    return this.session.get('access_token');
  }

  getRefreshToken() {
    return this.session.get('refresh_token');
  }

  changeToken(token: TokenResponse) {
    this.session.set('access_token', token.access_token, token.expires_in, 's');
    this.session.set('refresh_token', token.refresh_token, token.expires_in, 's');

    if (token.expires_in <= 60) return;

    var advInMs = (token.expires_in - 60)  * 1000;
    var expInMs = token.expires_in * 1000;

    if (AuthService.advisorTimer) {
      AuthService.advisorCounter.unsubscribe();
    }

    AuthService.advisorTimer = timer(advInMs);
    AuthService.advisorCounter = AuthService.advisorTimer.subscribe(r => {
      this.snackBar.open('Falta 1 minuto para que expire la sesión', 'Falta 1 minuto para que expire la sesión', this.configWarning);
        // this.toaster.showInfoToaster('Falta 1 minuto para que expire la sesión', 60 * 2000, true, () => {
        //   var rt = this.getRefreshToken();
        //   if (rt) {
        //     this.securityService.refresh(this.getRefreshToken(), this.getToken())
        //       .subscribe( (res : TokenResponse) => {
        //         this.changeToken(res);
        //       })
        //   }
        // });
    });

    if (AuthService.logoutTimer) {
      AuthService.logoutCounter.unsubscribe();
    }
    AuthService.logoutTimer = timer(expInMs);
    AuthService.logoutCounter = AuthService.logoutTimer.subscribe(r => {

      this.snackBar.open('Su sesión ha expirado!', 'Su sesión ha expirado!', this.configWarning);
      this.logout();
    });
  }

  setToken(res: TokenResponse) {
    this.changeToken(res);
  }

//   changePassword(model: ChangePasswordModel) {
//     this.securityService.changePassword(model)
//       .subscribe(res => {
//         //console.log(res);
//       });
//   }

  getUserId(): string {
    return this.session.get('userId');
  }

//   getBranchId(): string {
//     return this.session.get('branchId');
//   }

//   getBranchName(): string {
//     return this.session.get('branchName');
//   }

  getUser() {
    this.securityService.user(this.getUserId())
      .subscribe(res => {
        //console.log(res);
      });
  }

  login(user: User) {
    return new Promise((resolve, reject) => {

      this.securityService.authenticate(user)
        .subscribe((res : TokenResponse) => {
          if (res && res.access_token) {

            this.setToken(res);

            this.securityService.user(user.username)
              .subscribe((res: any) => {
                this.session.set('userId', res.NOMBRE);
                this.session.set('roles', JSON.stringify(res.roles));
                this.loggedIn.next(true);
                this.router.navigate(['/']);

                resolve(true);
            });
          }
          else {
            reject();
          }
        },
        (err) => {
          reject(err);
        });

    });
  }

  refreshToken(): Observable<any> {
    return this.securityService.refresh(this.getRefreshToken(), this.getToken());
  }

  logout() {
    this.session.clear();

    if (AuthService.advisorCounter){
      AuthService.advisorCounter.unsubscribe();
    }
    if (AuthService.logoutCounter){
      AuthService.logoutCounter.unsubscribe();
    }

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
