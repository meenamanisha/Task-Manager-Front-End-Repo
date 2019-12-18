import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SignUpComponent } from './user-auth/sign-up/sign-up.component';
import { LoginComponent } from './user-auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; 

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProfileComponent } from './home/profile/profile.component';
import { UserDetailsUpdateComponent } from './home/user-details-update/user-details-update.component';
import { AgGridModule } from 'ag-grid-angular';
import { DropdownComponent } from './home/user-details-update/dropdown/dropdown.component';
import { TitleCasePipe } from '@angular/common';
import { TasksComponent } from './home/tasks/tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    UserDetailsUpdateComponent,
    DropdownComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    AgGridModule.withComponents(null)

  ],
  providers: [TitleCasePipe],
  entryComponents:[DropdownComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
