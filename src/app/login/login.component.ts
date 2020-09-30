import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { User } from '../core/authentication/user.model';
import { AlertService } from '../core/http/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  loading: boolean;

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
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
        password: this.form.get('password').value,
      }
    };

    this.authService.login(args).subscribe(
      data => {
        if (data && data !== undefined) {
          console.dir(data);
          this.router.navigate(['/dashboard/']);
        }
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
