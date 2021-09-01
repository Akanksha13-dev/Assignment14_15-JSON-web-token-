import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers:any;
  constructor(private customersService: CustomersService,private route:Router) { }

  ngOnInit(): void {
  }
  toUsers(id:any):void{
    this.route.navigate([`/logged/customerUsers/${id}`]);
  }
  retrieveCustomers(element:any): void {
    element.textContent='Refresh Data';

    this.customersService.getCustomers()
    .subscribe(
      data => {
        this.customers = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}


}
