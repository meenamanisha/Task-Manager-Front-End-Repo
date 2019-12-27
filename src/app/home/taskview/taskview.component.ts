import { Component, OnInit, Injector } from '@angular/core';
import { HomeComponent } from '../home.component';
import { DatePipe } from '@angular/common';
import { UserServService } from '../HomeServices/user-serv.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit {
  private errorMessage: string;
  private columnDefs;
  public rowData: any[];
  private gridApi;
  private getRowHeight;

  private gridColumnApi;
  private defaultColDef;

  constructor(private injector: Injector, private datePipe: DatePipe,private service:UserServService) {        
    
    this.columnDefs = [
      { headerName: 'Task Id', field: 'tId', width: 110 },
      { headerName: 'Task Name', field: 'tName', width: 130 },
      { headerName: 'Task Owner', field: 'taskOwner', width: 120 },
      {
        headerName: 'Task STatus', field: 'tStatus', width: 160,
        cellEditorParams: {
          values: extractValues(statusMapping)
        },
        refData: statusMapping,
      },
      { headerName: 'Allocation Date', field: 'tAllDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },
      { headerName: 'Completion Date', field: 'tCompDate', width: 130, cellRenderer: (data) => { return this.datePipe.transform(data.value) } },

      { headerName: 'Expected Effort(hrs)', field: 'tExpEff', width: 130 },
      { headerName: 'Actual Effort(hrs)', field: 'tActEff', width: 130 },
      {
        headerName: 'Description', field: 'tDesc', width: 280,
        cellStyle: { "white-space": "normal" }
      }
    ];

    this.defaultColDef = {
      resizable: true,
      filter: true
    };

    this.getRowHeight = function (params) {
      if (params.data.tDesc != null)
        return 32 * (Math.floor(params.data.tDesc.length / 50) + 1);
      return 32;
    };
  }

  ngOnInit() {

    this.service.getAllTask("userTask").subscribe(
      t=>{
        this.rowData = t;
        // console.log(t);
        
      },
      err=>
      {
        this.errorMessage=err 
      }


    );
    
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