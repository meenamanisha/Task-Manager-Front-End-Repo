import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServService } from './HomeServices/user-serv.service';
import { user } from '../models/User';
import { task } from '../models/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private userRole: number;
  constructor(private router: Router, private serv: UserServService,private datePipe:DatePipe) {
    this.isShow = false;
  }

  public pendingTask: any[] = [];
  private lenOfPendingTask = 0;
  private us: user;
  errorMessage: string;
  ngOnInit() {
    this.isShow = this.serv.isShow = false;
    this.serv.currentUser = JSON.parse(localStorage.getItem('user'));
    this.us = this.serv.currentUser;
    this.userRole = this.us.role.rId;
    
    if (this.userRole == 2) {
      this.serv.getAllPendingTask().subscribe(
        t => {
          
          t.forEach(e1 => {
            e1.tasks.forEach(e2 => {
              let temp = { id: e1.usrId, name: e1.usrName, tId: e2.tId, tName: e2.tName, tStatus: e2.tStatus, tAllDate: this.datePipe.transform( e2.tAllDate), tExpEff: e2.tExpEff, tActEff: e2.tActEff }
              this.pendingTask.push(temp);
            });
          });
          this.lenOfPendingTask = this.pendingTask.length;
        },
        err => {
          this.errorMessage = err
        }
        );
      }
      
      else if (this.userRole == 3) { 

      this.serv.getAssignedTask().subscribe(
        t => { 
          t.map(items=>{
            items.tAllDate = this.datePipe.transform(items.tAllDate)
          })
          
          this.pendingTask =t;
          this.lenOfPendingTask = this.pendingTask.length;
        },
        err => {
          this.errorMessage = err
        }
      );
    }

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
