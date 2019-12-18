import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/ServicesForAll/authentication.service';
import { user } from 'src/app/models/User';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private serv: AuthenticationService, private titlecase: TitleCasePipe) { }

  isSubmit: boolean = false;
  loginForm: FormGroup
  errorMessage: String;
  usr: user;
  login() {
    this.isSubmit = true;


    this.serv.login(this.loginForm.value).subscribe(
      t => {
        this.usr = t,
          this.usr.usrName = this.titlecase.transform(this.usr.usrName);
        localStorage.setItem('user', JSON.stringify(this.usr));
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err

      }
    )

  }

  cancel() {
    this.loginForm.reset();
  }
  ngOnInit() {

    if (this.serv.loggedIn())
      this.router.navigate(['/home']);
    this.loginForm = this.formBuilder.group(
      {
        usrEmail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]


      }
    );

  }



}
