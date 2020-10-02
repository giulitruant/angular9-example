import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    debugger
    this.authentication.isLogged()
    .subscribe(user => {
        if(user && user !== undefined){
        this.isUserLoggedIn = true;
      }else{
        this.isUserLoggedIn = false;
      }
    });
    ;
  }

}
