import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { UserServService } from '../HomeServices/user-serv.service';

@Component({
  selector: 'app-man-hist',
  templateUrl: './man-hist.component.html',
  styleUrls: ['./man-hist.component.css']
})
export class ManHistComponent implements OnInit {
  private errorMessage: string;
  private columnDefs;
  public rowData: any[];
  private gridApi;
  private columnApi;
  private getRowHeight;

  private gridColumnApi;
  private defaultColDef;

  constructor(private service:UserServService, private datePipe: DatePipe) {
 
    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 90 },
      { headerName: 'Task Name', field: 'tName', width: 130 },
      {
        headerName: 'Task STatus', field: 'tStatus', width: 140,
        cellEditorParams: {
          values: extractValues(statusMapping)
        },
        refData: statusMapping
      },
      {headerName:"Creation Date",field:'tCreatDate' ,width: 120, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      {headerName:"Assinee", field:"tUserName",width:100},
      { headerName: 'Allocation Date', field: 'tAllDate', width: 119, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Completion Date', field: 'tCompDate', width: 129, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },

      { headerName: 'Expected (hrs)', field: 'tExpEff', width: 110},
      { headerName: 'Actual (hrs)', field: 'tActEff', width: 100 },
      {
        headerName: 'Description', field: 'tDesc', width: 305,
        cellStyle: { "white-space": "normal" }
      }
    ];

    this.defaultColDef = {
      resizable: true,
      filter: true,
      sortable:true,
      suppressHorizontalScroll: true
    };
    
    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
      return 32 * (Math.floor(params.data.tDesc.length / 47) + 1);
      return 32;
    };
  } 
  ngOnInit() {
    this.service.getAllCreatedTask().subscribe(
      t=>this.rowData=t,
      err=>this.errorMessage=err
      );
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi
      this.gridApi.suppressNoRowsOverlay = false; 
      this.gridApi.showLoadingOverlay()    
      this.gridApi.showNoRowsOverlay()
      this.gridApi.hideOverlay();
      this.gridApi.sizeColumnsToFit();
      

  }

}

var statusMapping = {
  IN_PROCESS: "In Process",
  CANCELLED: "Cancel",
  PENDING_TO_VERFIFY: "Verification Pending",
  COMPLETED:"Complete",
  NEW:"Newly Created"
};

function extractValues(mappings) {
  return Object.keys(mappings);
}