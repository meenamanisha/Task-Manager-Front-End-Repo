import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServService } from '../HomeServices/user-serv.service';
import { user } from 'src/app/models/User';
import { TitleCasePipe } from '@angular/common';
import { taskStatus } from 'src/app/models/TaskStatus';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {



  isSubmit = false;
  taskForm: FormGroup
  currentUser: user;
  errorMessage: String;
  successMessage: String;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: UserServService, private titlePipe: TitleCasePipe) {

    this.currentUser = this.service.currentUser;
  }


  ngOnInit() {

    this.taskForm = this.formBuilder.group({
      tName: ['', [Validators.required, Validators.minLength(3)]],
      tExpEff: ['', [Validators.required, Validators.min(1)]],
      tOwner: [this.currentUser.usrId, Validators.required],
      tDesc: ['', Validators.required],

      tStatus: [taskStatus.NEW]
    });

  }

  submit() {


    this.isSubmit = true;

    this.service.createTask(this.taskForm.value).subscribe(
      t => this.successMessage = t.message,
      err => this.errorMessage = err
    );

  }

  cancel() {

    this.taskForm.reset({ tOwner: this.currentUser.usrId });
  }
}
