import { Component, OnInit } from '@angular/core';
import { taskStatus } from 'src/app/models/TaskStatus';

@Component({
  selector: 'app-drop-down-for-status',
  templateUrl: './drop-down-for-status.component.html',
  styleUrls: ['./drop-down-for-status.component.css']
})
export class DropDownForStatusComponent {

  private params;
  private taskS:string[] = [];
  constructor() { }
  selectUser(event)
  {
   
    
  }
  agInit(params) {
    this.params = params;
    this.taskS.push("CANCELLED");
    this.taskS.push("IN_PROCESS");
    this.taskS.push("PENDING_TO_VERFIFY");

    
  }

}
