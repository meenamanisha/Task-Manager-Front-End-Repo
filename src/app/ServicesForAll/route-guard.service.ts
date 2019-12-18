import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  canActivate(): boolean {


    if (this.logIn.loggedIn())
      return true;

    this.router.navigate(['/login']);
    return false;

  }

  constructor(private router: Router, private logIn: AuthenticationService) { }
}
