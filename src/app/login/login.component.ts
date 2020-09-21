import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from '../core/authentication/auth.service';
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
    private service: AuthService,
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
      user : {
        email : this.form.get('email').value,
        password : this.form.get('password').value,
      }
    };

    debugger;
    this.service.getUser(args).subscribe(
      data => {
        if (data && data !== undefined){
          console.dir(data);
          this.router.navigate(['/article/home']);
        }
    },
    error => {
        this.alertService.error(error);
        this.loading = false;
      });

        this.router.navigate(['']);
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
