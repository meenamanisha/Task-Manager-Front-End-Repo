import { Component, OnInit, Injector } from '@angular/core';
import { HomeComponent } from '../home.component';
import { user } from 'src/app/models/User';
import { task } from 'src/app/models/task';
import { UserServService } from '../HomeServices/user-serv.service';
import { taskStatus } from 'src/app/models/TaskStatus';
import { DatePipe } from '@angular/common';

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

  constructor(private datePipe: DatePipe, private service:UserServService) {
    this.columnDefs = [
      { headerName: 'User Id', field: 'tUserId',width:110},
      { headerName: 'User Name', field: 'tUserName', width: 120 },
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 110 },
      { headerName: 'Task STatus', field: 'tStatus', width: 130 },
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130,cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Expected(hrs)', field: 'tExpEff', width: 120 },
      { headerName: 'Actual(hrs)', field: 'tActEff', width: 120 },
      { headerName: 'Creation Date', field: 'tCreatDate', width: 130,cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Compl Date', field: 'tCompDate', width: 130,cellRenderer: (data) => { return this.datePipe.transform(data.value) } }
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
    this.gridApi.sizeColumnsToFit();

  }

  ngOnInit() { 
    this.service.getAllPendingTask().subscribe(

      t=>
      {
        this.rowData = t 
        localStorage.setItem('penT', JSON.stringify(this.rowData.length));
        this.service.len = this.rowData.length          
      },
      err=>
        this.errorMessage=err
    );

  }
  listOfSuccessfultask:number[]; 
    
  
  onSelect(c) {  
  }
  
  onRowClicked(params)
  {
    if(params.node.selected )
    {
      this.rowData[params.rowIndex].tStatus=taskStatus.COMPLETED;
      this.rowData.splice(params.rowIndex,1);
      
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
      if(!m.has(item.tUserId))
        {
          let ur:user = new user();
          ur.tasks = []
          ur.usrId = item.tUserId
          selectedTask.push(ur);      
          m.set(item.tUserId,ur); 
          
        }
        let t = m.get(item.tUserId);      
        let  tk:task = new task();
        tk.tId = item.tId
        t.tasks.push(tk);         
    }
  //   m.forEach((value: user, key: number) => {
  //     let u:user =value;
  // });

  
  this.service.verifyPendingTask(selectedTask).subscribe(
    t=>{
      this.listOfSuccessfultask = t,
      this.gridApi.setRowData(this.rowData);
      localStorage.setItem('penT', JSON.stringify(this.rowData.length));
      this.service.len = this.rowData.length                  
    },
    err=>{this.errorMessage = err 
    }
  );    
  }
}
function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();  
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

