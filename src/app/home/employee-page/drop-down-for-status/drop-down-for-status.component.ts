import { Component, OnInit, Injector } from '@angular/core'; 
import { EmployeePageComponent } from '../employee-page.component';

@Component({
  selector: 'app-drop-down-for-status',
  templateUrl: './drop-down-for-status.component.html',
  styleUrls: ['./drop-down-for-status.component.css']
})
export class DropDownForStatusComponent {

  private params;
  private taskS:string[] = ["CANCELLED","IN_PROCESS","PENDING_TO_VERFIFY"];
  private rows:any[];
  private index:number;
  constructor(private inject:Injector) { 
    // let parent = this.inject.get(EmployeePageComponent)
    // this.rows = parent.rowData;    
  }
  selectUser(event)
  {
    this.params.value = this.taskS[event];
    console.log(this.taskS[event]);      
    console.log(this.index);
         
  }
  agInit(params) {
    params.value = "COMPLETED"
    this.params = params;
    this.index = params.rowIndex    
    
  }

}
