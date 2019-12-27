import { Component, OnInit, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HomeComponent } from '../home.component';
import { task } from 'src/app/models/task';

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
  private allTask:task[] = [];
  constructor(private datePipe: DatePipe) { 

    this.allTask.forEach(e=> {
      let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');        
      let date1:Date = new Date(e.tAllDate)
      let date2:Date = new Date();
      let day = date2.getDay();
      let firstDay = date2.getDate()-day;
      if(date2.getDate()-date1.getDate()<=day )
        console.log(e.tAllDate);
      else
      {
        console.log(e);
        
      }      
      console.log("=========================================");
      
      
      // console.log(date2.setd(firstDay));
      // console.log(date1.getDate);      
      // if(date1.get)
      // console.log(date);      
      // e["Average Percentage"] = null
      // console.log(date2); 
      // console.log(d2.getHours());      
    }
    );
    

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
  COMPLETED: "Complete"
};

function extractValues(mappings) {
  return Object.keys(mappings);
}