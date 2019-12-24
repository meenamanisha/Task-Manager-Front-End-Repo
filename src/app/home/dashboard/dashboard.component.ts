import { Component, OnInit, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private errorMessage: string;
  private columnDefs;
  public rowData: any[];
  private gridApi;
  private getRowHeight;

  private gridColumnApi;
  private defaultColDef;

  constructor(private datePipe: DatePipe, private injector:Injector) {

    
    
    // this.columnDefs = [
    //   { headerName: 'Task Id', field: 'tId', width: 110 },
    //   { headerName: 'Task Name', field: 'tName', width: 130 },
    //   { headerName: 'Task Owner', field: 'taskOwner', width: 120 },
    //   {
    //     headerName: 'Task STatus', field: 'tStatus', width: 160,
    //     cellEditorParams: {
    //       values: extractValues(statusMapping)
    //     },
    //     refData: statusMapping,
    //   },
    //   { headerName: 'Allocation Date', field: 'tAllDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
    //   { headerName: 'Allocation Date', field: 'tCompDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },

    //   { headerName: 'Expected Effort(hrs)', field: 'tExpEff', width: 130 },
    //   { headerName: 'Expected Effort(hrs)', field: 'tActEff', width: 130 },
    //   {
    //     headerName: 'Description', field: 'tDesc', width: 280,
    //     cellStyle: { "white-space": "normal" }
    //   }
    // ];

    // this.defaultColDef = {
    //   resizable: true,
    //   filter: true
    // };

    // this.getRowHeight = function (params) {
    //   if (params.data.tDesc != null)
    //     return 32 * (Math.floor(params.data.tDesc.length / 50) + 1);
    //   return 32;
    // };
  }

  ngOnInit() {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = false; 
    this.gridApi.showLoadingOverlay()    
    this.gridApi.showNoRowsOverlay()
    this.gridApi.hideOverlay()

  }

}

var statusMapping = {
  IN_PROCESS: "In Process",
  CANCELLED: "Cancel",
  PENDING_TO_VERFIFY: "Verification Pending",
  COMPLETED:"Complete"
};

function extractValues(mappings) {
  return Object.keys(mappings);
}