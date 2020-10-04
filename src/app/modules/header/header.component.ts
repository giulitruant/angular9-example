import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/authentication/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: Observable<User>;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authentication.currentUser;

  }

  onLogout(){
    this.authentication.logout();
  }

}
