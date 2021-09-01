import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import{CustomersComponent} from './customers/customers.component';
import{AddCustomerComponent} from './add-customer/add-customer.component';
import{CustomersDetailComponent} from './customers-detail/customers-detail.component';
import{CustomerUserComponent} from './customer-user/customer-user.component';
import{LoggedUserComponent} from './logged-user/logged-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { WelcomeComponent } from './welcome/welcome.component';
//import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
const routes: Routes = [
 
   {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'welcome/login',component:LogInComponent},
  {path:'welcome/signup',component:SignUpComponent},
  {path:'welcome',component:WelcomeComponent},
  {path:'logged',component:LoggedUserComponent,
      children:[
    {path:'',redirectTo:'users',pathMatch:'full'},
    {path:'users',component:HomeComponent},
    {path:'add',component:AddUsersComponent},
    {path:'users/:id',component:UsersDetailComponent},
    {path:'customers',component:CustomersComponent},
    {path:'addCustomer',component:AddCustomerComponent},
    {path:'customers/:id',component:CustomersDetailComponent},
    {path:'customerUsers/:id',component:CustomerUserComponent}
        ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
