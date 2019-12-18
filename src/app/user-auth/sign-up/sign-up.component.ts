import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/ServicesForAll/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSubmit = false;
  registerForm: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router, private serv: AuthenticationService) { }

  ngOnInit() {
    if (this.serv.loggedIn())
      this.router.navigate(['/home'])

    this.registerForm = this.formBuilder.group({
      usrName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      usrEmail: ['', [Validators.required, Validators.email]],
      role: this.formBuilder.group({
        rId: ['', Validators.required]
      }),
      usrPhno: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      usrCurrentAdd: ['', Validators.required],
      usrPermanentAdd: ['', Validators.required],
      usrProfileImage: [null]
    });
  }
  errorMessage: String;
  successMessage: String;
  successId: number;
  register() {


    this.isSubmit = true;

    this.serv.registration(this.registerForm.value).subscribe(
      t => {
        this.successId = t.usrId, this.successMessage = t.message
      },
      err => {

        this.errorMessage = err
      },
    )

  }

  cancel() {

    this.registerForm.reset();
  }
}
