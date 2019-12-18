import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  isAuthShow = false;
  constructor() { }
  check() {
    if (localStorage.getItem("user") != null)
      return false;
    else
      return true;
  }
  ngOnInit() {
  }


}
