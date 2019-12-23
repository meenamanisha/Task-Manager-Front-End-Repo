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
    
  
  onSelect(c) {  
  }
  
  onRowClicked(params)
  {
    if(params.node.selected )
    {
      this.rowData[params.rowIndex].tStatus=taskStatus.COMPLETED;
      delete this.rowData[params.rowIndex]
      
    }

    else
    {
      this.rowData.splice(params.rowIndex,0,params.data);
    }          

  }
  submit()
  {
    let selectedTask:user[] = []; 

    let m = new Map<number, user>();    
    for(let item of this.gridApi.getSelectedRows())
    {    
      console.log(item);
      
      if(!m.has(item.id))
        {
          let ur:user = new user();
          ur.tasks = []
          ur.usrId = item.id
          selectedTask.push(ur);      
          m.set(item.id,ur);
          console.log(selectedTask);
          
        }
        let t = m.get(item.id);      
        let  tk:task = new task();
        tk.tId = item.tId
        t.tasks.push(tk);         
    }
  //   m.forEach((value: user, key: number) => {
  //     let u:user =value;
  // });
  let parentComponent = this.injector.get(HomeComponent);
  console.log(selectedTask);
  
  
  this.service.verifyPendingTask(selectedTask).subscribe(
    t=>{
      this.listOfSuccessfultask = t,
      this.gridApi.setRowData(this.rowData);  
      parentComponent.pendingTask = this.rowData;
      parentComponent.lenOfPendingTask=this.rowData.length
    },
    err=>{this.errorMessage = err

      this.rowData = parentComponent.pendingTask;

    }
  );    
  }
}
function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();  
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

