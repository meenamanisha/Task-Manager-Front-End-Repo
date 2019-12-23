import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ContentChild } from '@angular/core';
import { user } from 'src/app/models/User';
import { UserServService } from '../HomeServices/user-serv.service';
import { DropDownFortaskComponent } from './drop-down-fortask/drop-down-fortask.component';
import { DatePipe } from '@angular/common';
import { taskStatus } from 'src/app/models/TaskStatus';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {



  columnDefs;
  rowData: any[] = null;
  gridApi;
  gridColumnApi;
  private getRowHeight;
  currentUser: user;
  errorMessage: string;

  constructor(private service: UserServService, private datePipe: DatePipe) {
    this.service.getAlluserDetails().subscribe(
      t => this.service.allEmployees = t,
      err => this.errorMessage = err
    );


    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 130 },
      { headerName: 'Task Name', field: 'tName' },
      { headerName: 'Status', field: 'tStatus', width: 130 },
      { headerName: 'Expected Effort', field: 'tExpEff', width: 130 },
      {
        headerName: 'Description', field: 'tDesc', width: 300,
        cellStyle: { "white-space": "normal" }
      },
      {
        headerName: 'Tassk Assign to', field: 'usr', width: 200, cellRendererFramework: DropDownFortaskComponent
      }
    ];
    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
        return 31 * (Math.floor(params.data.tDesc.length / 49) + 1);
      return 31;
    };

  }
  onGridReady(params) {
    this.gridApi = params.api;
    // params.api.sizeColumnsToFit();

  }


  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.service.userChange.subscribe(data => this.changeUser(data))

    this.service.getAllTask(this.currentUser.usrId).subscribe(
      t => {

        this.rowData = t
        this.rowData.forEach(function (e) {
          e["usr"] = null
        }
        );
      },
      err => this.errorMessage = err
    );



  }  
  private m = new Map<number, user>(); 
  changeUser(data) {
    this.rowData[data.ind].usr = data.usr.usrName
    this.rowData[data.ind].tStatus=taskStatus.IN_PROCESS
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');        
    let tempTask = { ...data.task };  
    delete tempTask['usr'];  
    tempTask.tAllDate=date;
    tempTask.tStatus = taskStatus.IN_PROCESS   
    if(this.m.has(data.usrInd))
    {
      this.m.get(data.usrInd).tasks.push(tempTask);
    }
    else
    {
      data.usr.tasks = [];      
      
      data.usr.tasks.push(tempTask);
      this.m.set(data.usrInd,data.usr)
    }        
  }
  lisOfUser: number[] = null
  submit() {
    let usrTaskList:user[] = [];      
    this.m.forEach((value: user, key: number) => {
      usrTaskList.push(value)
      
  });  
    this.service.assignTaskToUser(usrTaskList).subscribe(
      t => {
        this.lisOfUser = t;
        this.gridApi.setRowData(this.rowData);
        this.m.clear();
      },
      err => this.errorMessage = err
    );
  }


}