import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authService.currentUserValue;
    if (currentUser){
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }});
    return false;
  }

}