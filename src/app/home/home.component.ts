import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServService } from './HomeServices/user-serv.service';
import { user } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private userRole: string;
  constructor(private router: Router, private serv: UserServService) { }
  private us: user;
  ngOnInit() {
    this.isShow = false;

    this.serv.currentUser = JSON.parse(localStorage.getItem('user'));
    this.us = this.serv.currentUser;
    this.userRole = this.us.role.rName.toString();
  }
  isShow = false;
  change(s: string) {

    if (s == "home")
      this.serv.isShow = false;
    else
      this.serv.isShow = true;

  }
  logOut() {
    localStorage.removeItem("user")
    localStorage.clear()
    this.router.navigate(['/login'])

  }
}
