import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CustomersService } from 'src/app/services/customers.service';
//import { User } from 'src/app/user.model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  
  user = {

    id: '',
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    address: '',
    datetime:'',
    customerzId:'',
    username:'',
    password:''
  }
  submitted = false;
   // An array to store each customer(id,name) for drop down option for  customerName field
   Customers=new Array();
  // Added list for drop down option for role  field

  Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
  
  constructor(private usersService: UsersService,private customersService: CustomersService) { }

  ngOnInit(): void {
    this.customerList()
  }

  saveUser(): void {
    
    console.log("data:",this.user);
    //Validation of data before sending to add
      //Validtaion of input before sending
      const emailType = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let email= emailType.test(`${this.user.email}`);
      let phonenoType = /^\d{10}$/;
      let phoneNumber=phonenoType.test(`${this.user.phoneNumber}`); 
      if(this.user.firstName=="" ||`${this.user.firstName}`.length<3){
        alert("FirstName cannot be empty and length must be greater than 3");
        return;
        
      }
      if(this.user.middleName!="" &&`${this.user.middleName}`.length<3){
        alert("MiddleName  length must be greater than 3 if present");
        return;
        
      }
      if(this.user.lastName=="" ||`${this.user.lastName}`.length<2){
        alert("lastName cannot be empty and length must be greater than 2");
        return;
        
      }
      if(!email){
        alert("invalid email");
        return;
        
      }
      if(!phoneNumber){
        alert("Invalid phoneNumber");
        return;
        
      }
      if(this.user.address=="" ||`${this.user.address}`.length<2){
        alert("Address cannot be empty and address length must be greater than 2");
        return;
        
      }
      if(this.user.datetime==""){
        alert("datetime cannot be empty and must be in format");
        return;
        
      }
      ///* If it satisfies all validation condition then it will add
    this.usersService.addUser(this.user)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          alert("You may not having permission to add new Users")
          console.log(error);
        });
        
  }
  customerList():void{
    this.customersService.getCustomers()
    .subscribe(
      data => {
        for (let customer of data)
        {
          const id=customer.id;
          const name=customer.name;
          this.Customers.push({id:id,name:name});
        }
        //this.customerList = data;
        console.log(data);
        console.log("customerList",this.Customers);
      },
      error => {
        console.log(error);
      });
   }

  newUser(): void {
    this.submitted = false;
    this.user = {

      id: '',
      firstName: '',
      middleName:'',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      address: '',
      datetime:'',
      customerzId:'',
      username:'',
      password:''
    };
  }
  

}
