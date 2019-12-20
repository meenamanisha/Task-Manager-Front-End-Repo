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
        return 28 * (Math.floor(params.data.tDesc.length / 60) + 1);
      return 28;
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
  userTaskList: user[] = [];

  changeUser(data) {
    this.rowData[data.ind].usr = data.usr.usrName
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    data.task.tAllDate = date;
    data.task.tStatus = taskStatus.IN_PROCESS
    data.usr.tasks = [];
    let tempTask = { ...data.task };

    delete tempTask['usr'];
    data.usr.tasks.push(tempTask);
    this.userTaskList.push(data.usr)
  }
  lisOfUser: number[] = null
  submit() {
    // console.log(this.userTaskList)
    this.service.assignTaskToUser(this.userTaskList).subscribe(
      t => {
        this.lisOfUser = t;
        this.gridApi.setRowData(this.rowData);
      },
      err => this.errorMessage = err
    );
  }


}