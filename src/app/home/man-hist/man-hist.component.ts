import { Component, OnInit, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HomeComponent } from '../home.component';

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
  private getRowHeight;

  private gridColumnApi;
  private defaultColDef;

  constructor(private injector: Injector, private datePipe: DatePipe) {


    let parentComponent = this.injector.get(HomeComponent);
    this.rowData = parentComponent.completeTask; 
    
    this.errorMessage = parentComponent.errorMessage;
    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 100 },
      { headerName: 'Task Name', field: 'tName', width: 120 },
      {
        headerName: 'Task STatus', field: 'tStatus', width: 130,
        cellEditorParams: {
          values: extractValues(statusMapping)
        },
        refData: statusMapping
      },
      {headerName:"assinee", field:"tUserName",width:100},
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Allocation Date', field: 'tCompDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },

      { headerName: 'Expected (hrs)', field: 'tExpEff', width: 100 },
      { headerName: 'Actual (hrs)', field: 'tActEff', width: 100 },
      {
        headerName: 'Description', field: 'tDesc', width: 300,
        cellStyle: { "white-space": "normal" }
      }
    ];

    this.defaultColDef = {
      resizable: true,
      filter: true,
      sortable:true
    };

    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
        return 32 * (Math.floor(params.data.tDesc.length / 47) + 1);
      return 32;
    };
  }

  ngOnInit() {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.suppressNoRowsOverlay = false; 
    this.gridApi.showLoadingOverlay()    
    this.gridApi.showNoRowsOverlay()
    this.gridApi.hideOverlay();
    params.api.sizeColumnsToFit(); 

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