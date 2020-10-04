import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { map, take } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService.isLoggedIn()
        .pipe(
            take(1),
            map((user: any) => {
                if (!(user && user !== undefined)){
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            }));
    }
}