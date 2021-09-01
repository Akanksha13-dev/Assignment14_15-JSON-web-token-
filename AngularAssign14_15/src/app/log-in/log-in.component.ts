import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  credentials = {
    email:"",
    password:""
  }
  constructor(private cookieService:CookieService,private usersService: UsersService,private route: Router) { }

  ngOnInit(): void {
   
  }

  onSubmit(){
    this.usersService.login(this.credentials).subscribe((response:any)=>{
      
    
      this.cookieService.put("id",response.token)
      this.route.navigateByUrl('/logged/users')
     
    }, err=>{
      alert(`Invalid Credentials`)
      console.log(err)
    })
  }

  
}
