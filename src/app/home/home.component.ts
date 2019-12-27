import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServService } from './HomeServices/user-serv.service';
import { user } from '../models/User';
import { DatePipe } from '@angular/common';
import { taskStatus } from '../models/TaskStatus';
import { task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private userRole: number;
  constructor(private router: Router, private serv: UserServService, private datePipe: DatePipe) {
    this.isShow = false;
  }

   
  public lenOfPendingTask = 0;
  private us: user;
  errorMessage: string;
  public completeTask: task[] = [];


  ngOnInit() {
    this.isShow = this.serv.isShow = false;
    // this.serv.currentUser = JSON.parse(localStorage.getItem('user'));
    this.us = this.serv.currentUser;
    this.userRole = this.us.role.rId; 

    
    this.serv.len = parseInt(localStorage.getItem('penT'));
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
