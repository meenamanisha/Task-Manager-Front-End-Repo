import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/User';
import { UserServService } from '../HomeServices/user-serv.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private getRowHeight;
  // public modules: Module[] = AllCommunityModules;
  private rowData: [] = null;
 

  currentUser: user;
  errorMessage: string;

  constructor(private service: UserServService) {

    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 150 },
      { headerName: 'Status', field: 'tStatus', width: 110 },
      { headerName: 'Expected Effort', field: 'tExpEff', width: 120 },
      {
        headerName: 'Description', field: 'tDesc', width: 350,
        cellStyle: { "white-space": "normal" }
      }
    ];


    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };

  }
  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.service.getAllTask(this.currentUser.usrId).subscribe(
      t => this.rowData = t,
      err => this.errorMessage = err
    );

  }

}
