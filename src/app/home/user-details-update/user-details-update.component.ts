import { Component, OnInit, ElementRef } from '@angular/core';
import { UserServService } from '../HomeServices/user-serv.service';
import { user } from 'src/app/models/User';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details-update',
  templateUrl: './user-details-update.component.html',
  styleUrls: ['./user-details-update.component.css']
})
export class UserDetailsUpdateComponent implements OnInit {


  constructor(private service: UserServService, private titlePipe: TitleCasePipe, private router: Router, private elRef: ElementRef) { }
  rowData:any[];
  columnDefs = [
    { headerName: 'Id', field: 'usrId', width: 110 },
    { headerName: 'Name', field: 'usrName', width: 150 },
    { headerName: 'Role', field: 'role.rName', width: 110 },

    { headerName: 'Manager Id', field: 'usrMName', width: 120, cellRendererFramework: DropdownComponent },
    { headerName: 'Email', field: 'usrEmail', width: 200 },
    { headerName: 'Phone no', field: 'usrPhno', width: 110 },
    { headerName: 'Current Address', field: 'usrCurrentAdd' },
    { headerName: 'Permanent Address', field: 'usrPermanentAdd' }

  ];

  error;

  currentUser: user;
  ngOnInit() {
    this.service.updateManager.subscribe(data => this.updateManagers(data))
    this.service.getManager().subscribe(
      t => this.service.managers = t,

      err => this.error = err
    )
    this.service.getAlluserDetails().subscribe(
      t => {
        this.rowData = t.map(item => {
          item.role.rName = this.titlePipe.transform(item.role.rName.toUpperCase());
          return item
        })
      },
      err => this.error = err
    );

  } 
  updatedUser: user[] = [];
  updateManagers(data: any) 
  {
    
    var tempUsr:user = {...this.rowData[data.index]};
    tempUsr.role = null
    tempUsr.usrMId = data.usr.usrId;    
    this.updatedUser.push(tempUsr);
    this.rowData[data.index].usrMName = data.usr.usrName;
  }

  listOfupdatedUsers: number[] = null
  gridApi;
  onGridReady(params)
  {
    
    this.gridApi = params.api;

  }
  onSubmit() { 
    this.service.userManagerUpdate(this.updatedUser).subscribe(
      t => {
        this.listOfupdatedUsers = t;
        this.gridApi.setRowData(this.rowData);  
        this.updatedUser = [];          
      },
      err => this.error = err

    );



  }



}

