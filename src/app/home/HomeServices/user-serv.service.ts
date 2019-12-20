import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paths } from 'src/assets/uriPaths';
import { user } from 'src/app/models/User';
import { retry, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/ServicesForAll/authentication.service';
import { task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class UserServService {

  constructor(private http: HttpClient, private serv: AuthenticationService) { }

  public updateManager: Subject<any> = new Subject();
  public userChange: Subject<any> = new Subject();
  managers: user[];
  currentUser: user;
  isShow = false;
  allEmployees: user[];


  verifyPendingTask(usr:user[]):Observable<any>
  {
    const uri = environment.baseURI + paths.proPath + paths.verifyTask+"/"+this.currentUser.usrId;
    return this.http.put<any>(uri,usr).pipe(catchError(this.handleError));

  }
  getAllPendingTask(): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.pendingTask+"/"+this.currentUser.usrId;
    return this.http.get<any>(uri).pipe(catchError(this.handleError));
  }
  createTask(ctask: task): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.createTask;
    return this.http.post<any>(uri, ctask).pipe(catchError(this.handleError));
  }


  getAlluserDetails(): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.userDetails + "/" + this.currentUser.usrId;
    return this.http.get<any>(uri).pipe(retry(1), catchError(this.handleError));
  }
  getManager(): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.userManagers + "/" + this.currentUser.usrId;
    return this.http.get<any>(uri).pipe(catchError(this.handleError));
  }

  userManagerUpdate(user1: user[]): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.userUpdateManager;
    return this.http.put<any>(uri, user1).pipe(catchError(this.handleError));;
  }

  assignTaskToUser(emp: user[]): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.assignTask
    return this.http.put<any>(uri, emp).pipe(catchError(this.handleError));

  }


  private handleError(err: HttpErrorResponse) {
    let errMsg;
    if (err.error instanceof Error) {
      {
        console.log('An error occurred:', err.error.message);
        errMsg = { status: err.status, message: err.error.message }
      }
    } else if (err.status == 0) {
      errMsg = { status: err.status, message: "Server is not respoding, Please try after some time" }
    }

    else {
      console.log(`Backend returned code ${err.status}`);

      errMsg = { status: err.status, message: err.error }
    }
    return throwError(errMsg);
  }


  getAllTask(id: number): Observable<any> {
    const uri = environment.baseURI + paths.proPath + paths.getTask + "/" + id;
    return this.http.get<any>(uri).pipe(catchError(this.handleError));
  }
}