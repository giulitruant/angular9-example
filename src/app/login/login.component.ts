import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../core/authentication/auth.service';

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
    private service: AuthService
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

    this.service.getUser(args)
      .toPromise().then((res: any) => {
        this.loading = false;
        this.user = res;


      })
      .catch((error) => console.dir(error));

  }


}
