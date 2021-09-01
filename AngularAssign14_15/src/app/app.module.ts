import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import{CustomersComponent} from './customers/customers.component';
import{AddCustomerComponent} from './add-customer/add-customer.component';
import{CustomersDetailComponent} from './customers-detail/customers-detail.component';
import{CustomerUserComponent} from './customer-user/customer-user.component';
import{LoggedUserComponent} from './logged-user/logged-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CookieModule } from 'ngx-cookie';
//import {BrowserAnimationsModule} from '@angular/platform browser/animations';

//import {MaterialModule} from '@angular/material'
//import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUsersComponent,
    UsersDetailComponent,
    CustomersComponent,
    AddCustomerComponent,
    CustomersDetailComponent,
    CustomerUserComponent,
    LoggedUserComponent,
    LogInComponent,
    WelcomeComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot()
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
