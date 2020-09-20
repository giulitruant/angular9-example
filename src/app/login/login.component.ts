import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user : new FormControl('', Validators.required),
    pass : new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.invalid)
    {
      return;
    }

    console.dir(this.form.value);

  }


}
