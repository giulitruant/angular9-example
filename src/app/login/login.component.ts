import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/authentication/auth.service';
import { AlertService } from '../core/http/model/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  loading: boolean;

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private serviceAuthentication: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const args = {
      user: {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      }
    };

    this.serviceAuthentication.login(args)
      .toPromise().then((res: any) => {
        this.loading = false;
        this.user = res;

        this.router.navigate(['']);

      })
      .catch((error) => {
        this.alertService.error(error);
        this.loading = false;
      });

  }

}
