import { Component, OnInit } from '@angular/core';
import { UserServService } from '../../HomeServices/user-serv.service';
import { user } from 'src/app/models/User';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent  {
  managers:user[]
  selectedManager:String = ''
  params:any
  constructor(private sev:UserServService) {
  }  
  agInit(params) { 
    this.params = params;
    this.managers = this.sev.managers
    
  }
  updateManager(){
    this.sev.updateManager.next({index:this.params.rowIndex,mid:this.selectedManager});
  }
}
