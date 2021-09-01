import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
//import { Customers } from 'src/app/customers.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  newCustomer = {
    id: '',
    name: '',
    
    address: '',
    website:''
  
  }
  message="";
  submitted = false;
  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
  }
  saveCustomer(): void {
    this.message="";
    if(this.newCustomer.name=="" ||`${this.newCustomer.name}`.length<2){
      alert("CustomerName cannot be empty and  length must be greater than 2");
      return;
      
    }
    if(this.newCustomer.address=="" ||`${this.newCustomer.address}`.length<2){
      alert("Address cannot be empty and address length must be greater than 2");
      return;
      
    }
    if(this.newCustomer.website=="" ||`${this.newCustomer.website}`.length<2){
      alert("Website cannot be empty and  length must be greater than 2");
      return;
      
    }
    //After validating input 
    const data = {
      id: parseInt(this.newCustomer.id),
      name: this.newCustomer.name,
      address:this.newCustomer.address,
      website: this.newCustomer.website,
      
    };
    // console.log("data:",data);
    // console.log("Object1:",this.newCustomer);

    this.customersService.addCustomer(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
          this.message="May ID already Present, choose id not present in customer table or you don't have permission";

        });
  }

  new_Customer(): void {
    this.submitted = false;
    this.newCustomer= {

      id: '',
      name: '',
      
      address: '',
      website:''
    };
  }
  

}
