import { Component, OnInit, Injector, ElementRef, AfterViewInit } from '@angular/core';
import { UserServService } from '../HomeServices/user-serv.service';
import { HomeComponent } from '../home.component';
import { DropDownForStatusComponent } from './drop-down-for-status/drop-down-for-status.component';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit,AfterViewInit {
  private errorMessage: string;
  private columnDefs;
  private rowData: any[];
  private gridApi;
  private getRowHeight;
  private defaultColDef;
  listOfSuccessfultask:number[]=null;
  pageSize:number=1;
  changePage(e)
  {
    console.log(e)
    this.gridApi.paginationSetPageSize(this.pageSize)
  }
  constructor(private injector: Injector, private service:UserServService, private elementRef:ElementRef) { 

    let parentComponent = this.injector.get(HomeComponent);
    this.rowData = parentComponent.pendingTask;
    this.errorMessage = parentComponent.errorMessage;
    this.columnDefs = [      
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 130 },
      { headerName: 'Task Owner', field: 'taskOwner', width: 120 },
      { headerName: 'Task STatus', field: 'tStatus', width: 200, cellRendererFramework:DropDownForStatusComponent },
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130 },
      { headerName: 'Expected Effort', field: 'tExpEff', width: 130 },
      // { headerName: 'Actual Effort', field: 'tActEff',type:'number',editable:true, width: 130 },
      {headerName:'Description',field:'tDesc' ,width:280,
      cellStyle: { "white-space": "normal" }}
    ];

    this.defaultColDef = { 
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
      resizable: true
    };

    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
        return 32 * (Math.floor(params.data.tDesc.length / 50) + 1);
      return 32;
    };
  }

  ngAfterViewInit(): void {
   console.log(this.elementRef.nativeElement.querySelector('.ag-paging-panel').children)
    this.elementRef.nativeElement.querySelector('.ag-paging-panel').children[0].addEventListener('onchange', this.changePage.bind(this));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = false; 
    this.gridApi.showLoadingOverlay()    
    this.gridApi.showNoRowsOverlay()
    this.gridApi.hideOverlay() 
    this.gridApi.sizeColumnsToFit()
    this.elementRef.nativeElement.querySelector('.ag-paging-panel').insertAdjacentHTML('afterbegin',
    '<select #paginationDropDown id="paginationDropDown"><option>1</option> <option>2</option> <option>3</option></select>');

  }

  submit()
  {
    
  }

  ngOnInit() {
    // let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');        
    

  }

}
function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();  
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}