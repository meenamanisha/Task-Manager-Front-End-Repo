import { Component, OnInit, Injector, ElementRef, AfterViewInit } from '@angular/core';
import { UserServService } from '../HomeServices/user-serv.service';
import { HomeComponent } from '../home.component';
import { task } from 'src/app/models/task';
import { DatePipe } from '@angular/common'; 


@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit, AfterViewInit {
  private errorMessage: string;
  private columnDefs;
  public rowData: any[];
  private gridApi;
  private getRowHeight;

  private gridColumnApi;
  private defaultColDef;
  listOfSuccessfultask: number[] = null;
  pageSize: number = 10;
  // changePage(e)
  // {
  //   console.log(e)
  //   this.gridApi.paginationSetPageSize(this.pageSize)
  // }
  constructor(private injector: Injector, private service: UserServService, private elementRef: ElementRef, private datePipe: DatePipe) {
    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 130 },
      { headerName: 'Task Owner', field: 'taskOwner', width: 120 },
      {
        headerName: 'Task STatus', field: 'tStatus', width: 160,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: extractValues(statusMapping)
        },
        filter: "agSetColumnFilter",
        refData: statusMapping,
      },
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Expected Effort(hrs)', field: 'tExpEff', width: 130 },
      {
        headerName: 'Description', field: 'tDesc', width: 280,
        cellStyle: { "white-space": "normal" }
      }
    ];

    this.defaultColDef = {
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
      resizable: true,
      filter: true
    };

    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
        return 32 * (Math.floor(params.data.tDesc.length / 50) + 1);
      return 32;
    };
  }

  ngAfterViewInit(): void {
    //  console.log(this.elementRef.nativeElement.querySelector('.ag-paging-panel').children)
    // this.elementRef.nativeElement.querySelector('.ag-paging-panel').children[0].addEventListener('change', this.changePage.bind(this));    

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = false;
    this.gridApi.hideOverlay()
    this.gridApi.sizeColumnsToFit()

    this.gridColumnApi = params.columnApi;
    // this.elementRef.nativeElement.querySelector('.ag-paging-panel').insertAdjacentHTML('afterbegin',
    // '<select #paginationDropDown id="paginationDropDown"><option>1</option> <option>2</option> <option>3</option></select>');

  }
  // private mapOfTask = new Map<number,task>()
  public isShow=true;
  onSelect(c) {     
    if(c.data.tStatus!="IN_PROCESS")
    {
      if(c.node.selected )
      {      
          // this.mapOfTask.set(c.rowIndex,c.data);
          this.rowData.splice(c.rowIndex,1)      
      }
      else
      {
        // this.mapOfTask.delete(c.rowIndex);
        this.rowData.splice(c.rowIndex,0,c.data);
      }
    }       
    
  }

  submit() {

    let tasks: task[] = [];  
    for (let i of this.gridApi.getSelectedRows()) {
      if(i.tStatus=='IN_PROCESS')
        continue;

      let date1 = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
      i.tCompDate = date1;
      let date2 = this.datePipe.transform(i.tAllDate, 'yyyy-MM-dd hh:mm:ss');
      let d1:Date = new Date(date1);
      let d2:Date = new Date(date2); 
      var msec = d1.getTime() - d2.getTime();
      var mins = Math.floor(msec / 60000);
      var hrs = Math.floor(mins / 60);
      i.tActEff = hrs; 
      tasks.push(i);
    }

    if (tasks.length < 1)
      return;

    this.service.userProcessedTask(tasks).subscribe(
      t=>{                
        this.listOfSuccessfultask = t
        this.gridApi.setRowData(this.rowData);             
        this.service.len = this.rowData.length
             

      },
      err=>{
        this.errorMessage = err 
      }
    );


  }

  ngOnInit() {
    // let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');        

    this.service.getAllTask("assignedTask").subscribe(
      t=> this.rowData = t,
      err=>this.errorMessage=err
    );


  }
}
function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

var statusMapping = {
  IN_PROCESS: "In Process",
  CANCELLED: "Cancel",
  PENDING_TO_VERFIFY: "Complete"
};

function extractValues(mappings) {
  return Object.keys(mappings);
}