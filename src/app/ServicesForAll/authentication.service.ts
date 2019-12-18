import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { user } from '../models/User';
import { environment } from 'src/environments/environment';
import { paths } from 'src/assets/uriPaths';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  loggedIn(): boolean {
    if (localStorage.getItem('user'))
      return true;
    else
      return false;
  }
  registration(user1: user): Observable<any> {

    const uri = environment.baseURI + paths.proPath + paths.signUp;

    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(uri, user1, { headers: options }).pipe(catchError(this.handleError));


  }


  login(user1: user): Observable<any> {

    const uri = environment.baseURI + paths.proPath + paths.logIn;
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(uri, user1, { headers: options }).pipe(catchError(this.handleError));

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



}
