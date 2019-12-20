import { Component, OnInit, Injector } from '@angular/core';
import { HomeComponent } from '../home.component';
import { user } from 'src/app/models/User';
import { task } from 'src/app/models/task';
import { UserServService } from '../HomeServices/user-serv.service';
import { taskStatus } from 'src/app/models/TaskStatus';

@Component({
  selector: 'app-verfify-task',
  templateUrl: './verfify-task.component.html',
  styleUrls: ['./verfify-task.component.css']
})
export class VerfifyTaskComponent implements OnInit {

  errorMessage: string;
  columnDefs;
  rowData: any[];
  gridApi;
  gridColumnApi;
  defaultColDef;

  constructor(private injector: Injector, private service:UserServService) {
    let parentComponent = this.injector.get(HomeComponent);
    this.rowData = parentComponent.pendingTask;
    this.errorMessage = parentComponent.errorMessage 


    this.columnDefs = [
      { headerName: 'User Id', field: 'id'},
      { headerName: 'User Name', field: 'name', width: 140 },
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 130 },
      { headerName: 'Task STatus', field: 'tStatus', width: 130 },
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130 },
      { headerName: 'Expected Effort', field: 'tExpEff', width: 130 },
      { headerName: 'Actual Effort', field: 'tActEff', width: 130 }
    ];
    this.defaultColDef = { 
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
      resizable: true
    };
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = false; 
    this.gridApi.showLoadingOverlay()    
    this.gridApi.showNoRowsOverlay()
    this.gridApi.hideOverlay() 

  }

  ngOnInit() {

    // this.rowData = this.allPendingTask
    // console.log(this.rowData);

  }
  listOfSuccessfultask:number[]; 
  private m = new Map<number, task[]>();    
  onRowClicked(params)
  {
    let i = params.rowIndex;
    
    if(!this.m.has(this.rowData[i].id))
      {
        this.m.set(this.rowData[i].id,[]);
      }
      let t:task[] = this.m.get(this.rowData[i].id);
      let  tk:task = new task();
      tk.tId = this.rowData[i].tId

      t.push(tk); 
      this.rowData[i].tStatus=taskStatus.COMPLETED;
      
      delete this.rowData[i];
    

  }
  submit()
  {
    let selectedTask:user[] = [];      
    this.m.forEach((value: task[], key: number) => {
      let u:user = new user;
      u.usrId = key;      
      u.tasks = value;
      selectedTask.push(u);      
  });
  
  
  this.service.verifyPendingTask(selectedTask).subscribe(
    t=>{
      this.listOfSuccessfultask = t,
        this.gridApi.setRowData(this.rowData);  

    },
    err=>this.errorMessage = err
  );    
  }
}
function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();  
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

