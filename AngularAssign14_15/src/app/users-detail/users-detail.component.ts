import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  
  user:User={
    id: '',
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    role:'',
    roles: {key:'',name:''},
    address: '',
    datetime:'',
    customerzId:'',
    customerz:{id:'',name:'',address:'',website:''},
    
  };
  
  message='';
  // An array to store each customer(id,name) for drop down option for  customerName field
  Customers=new Array();
// Added list for drop down option for role field
   Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
   
   
  constructor(private usersService: UsersService,private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserD((this.route.snapshot.paramMap.get('id')));
    this.customerList();
  }
  getUserD(id:any): void {
    console.log(id);
  
    this.usersService.getUser(id)
      .subscribe(
        data => {
          this.user = data;
          // To made data datetime compatible with datetime-local
          const date=new Date(data.datetime);
          this.user.datetime=date.toISOString().slice(0,-5);
          console.log('data',data);
         
          console.log('currentdata',this.user);
        },
        error => {
          console.log(error);
        });
  }

  update(): void {
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
    ///* If it satisfies all validation condition then it will update
    this.usersService.editUser(this.user.id, this.user)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was updated successfully!';
        },
        error => {
          alert("You may not having permission to update")
          console.log(error);
        });
  }

  delete(): void {
    this.usersService.deleteUser(this.user.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was deleted successfully!';
        },
        error => {
          alert("You may not having permission to delete")
          console.log(error);
        });
  }
 
  //** To create customer-List for customer drop down selection.
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
        alert("You may not having permission");
        console.log(error);
      });
   }
   //
}
