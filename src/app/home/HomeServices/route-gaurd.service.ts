import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserServService } from './user-serv.service';
import { user } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate {
  constructor(private service: UserServService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser: user = JSON.parse(localStorage.getItem("user"));

    if (route.url[0].path == "userUpdate" && currentUser.role.rId == 1)
      return true;
    else if (route.url[0].path == "createTask" && currentUser.role.rId == 2)
      return true;
    else if (route.url[0].path == "assignTask" && currentUser.role.rId == 2)
      return true;
    else if (route.url[0].path == "verifyTask" && currentUser.role.rId == 2)
      return true;
    else if (route.url[0].path == "employeeTask" && currentUser.role.rId == 3)
      return true;
    else if (route.url[0].path == "viewHistory" && currentUser.role.rId == 3)
      return true;
      else if (route.url[0].path == "dashboard" && currentUser.role.rId == 2)
      return true;
    else {
      
      this.router.navigate(['/home']);
      this.service.isShow = false;
    }
  }

}
