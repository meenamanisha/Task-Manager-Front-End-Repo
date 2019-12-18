import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { SignUpComponent } from './user-auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RouteGuardService } from './ServicesForAll/route-guard.service'; 
import { ProfileComponent } from './home/profile/profile.component';
import { UserDetailsUpdateComponent } from './home/user-details-update/user-details-update.component';
import { RouteGaurdService } from './home/HomeServices/route-gaurd.service';
import { TasksComponent } from './home/tasks/tasks.component';


const routes: Routes = [

  {path:'home',component:HomeComponent, canActivate:[RouteGuardService],runGuardsAndResolvers: 'always',
  children:
  [
    {path:'profile',component:ProfileComponent},
    {path:'userUpdate',component:UserDetailsUpdateComponent,canActivate:[RouteGaurdService]},
    {path:'createTask',component:TasksComponent}
  ]},
  
  {path:'login',component:LoginComponent,runGuardsAndResolvers: 'always'},   
  {path:'signup',component:SignUpComponent,runGuardsAndResolvers: 'always'},
  { path: '**', redirectTo: '/home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
