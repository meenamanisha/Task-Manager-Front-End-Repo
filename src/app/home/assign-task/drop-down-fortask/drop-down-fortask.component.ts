import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/User';
import { UserServService } from '../../HomeServices/user-serv.service';

@Component({
  selector: 'app-drop-down-fortask',
  templateUrl: './drop-down-fortask.component.html',
  styleUrls: ['./drop-down-fortask.component.css']
})

export class DropDownFortaskComponent {

  constructor(private service:UserServService) { }

  allEmployees:user[];
  params;
  
  agInit(params) { 
    this.params = params;    
    this.allEmployees = this.service.allEmployees;   
    
  }
  selectUser(index)
  {    
    var userT:user =   this.allEmployees[index];  
    this.service.userChange.next({task:this.params.data,usr:userT,ind:this.params.rowIndex,usrInd:index});
  } 
} 
