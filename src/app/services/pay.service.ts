import { Injectable } from '@angular/core';
// const stripe = require('stripe')('pk_test_yAlKJ3fXF40BdP9izGoLVBeO001hVX2XVN');
@Injectable({
  providedIn: 'root'
})

export class PayService {
  // public baseUrl:string='https://api.stripe.com';
  
  public haveRequestPayment:boolean=false;
  public payResult:boolean=false;
  constructor() { 
    
  }
  getStripe(){
    // return stripe;
  }
}
