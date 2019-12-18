import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/ServicesForAll/authentication.service';
import { user } from 'src/app/models/User';
import { UserServService } from '../HomeServices/user-serv.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userRole: String;
  constructor(private serv: UserServService) { }
  private usr: user;
  ngOnInit() {
    this.usr = this.serv.currentUser;

  }


}
