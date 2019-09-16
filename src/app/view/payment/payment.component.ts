import { Component, OnInit,AfterViewInit } from '@angular/core';
import { InfoMationService } from '../../services/infomation.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions,StripeJS,StripeInstance,StripeFactoryService} from "ngx-stripe";
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
// import apiConifg from '../../../assets/api.json';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit,AfterViewInit {
  stripe:StripeInstance;
  elements: Elements;
  card: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  stripeTest: FormGroup;
  stripeInstance:StripeInstance;
  stripeJs:StripeJS;
  public isInRequesting:boolean=false;
  constructor(
   private fb: FormBuilder,
   private stripeService: StripeService,
   public infomationService:InfoMationService,
   private stripeFactory:StripeFactoryService,
   private router:Router,
   private requestService:RequestService
  ) { }

  ngOnInit() {
    // console.log(this.payService.getStripe());
    // this.stripe=this.stripeFactory.create(this.infomationService.stripePublicKey);
    this.stripeService.setKey(this.infomationService.stripePublicKey);
    // console.log(this.infomationService.stripePublicKey)
    console.log(this.infomationService.stripePublicKey)
    this.stripeTest = this.fb.group({
      
    });
    
  }
  ngAfterViewInit(){
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }
  buy() {
    //4242424242424242
    if(this.card['_invalid']||!this.card['_complete']){
      //
      this.infomationService.appInstance.showError(
        'invalid credit card'
      )
      return;
    };
    this.isInRequesting=true;
    const name = this.infomationService.signup_form.firstname+' '+this.infomationService.signup_form.lastname;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        console.log('///token///');
        console.log(result);
        if (result.token) {
          // this.stripeService.paymentRequest.
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          // console.log(JSON.stringify(result.token));
          let params={
            uid:this.infomationService.signup_form.uid,
            amount:this.infomationService.signup_form.total,
            token:result.token.id
          }
          this.requestService.post(this.infomationService.apiConfig.charge.url+this.requestService.getParamStr(params),params).subscribe(result=>{
            console.log(result)
            this.isInRequesting=false;
            if(result['data']&&result['data']['status']&&result['data']['status']=='succeeded'){
              this.infomationService.payResult=true;
            }else{
              this.infomationService.payResult=false;
            }
            this.infomationService.haveRequestPayment=true;
            this.router.navigate(['./view/result']);
          },error=>{
            this.isInRequesting=false;
            this.infomationService.setPayResult(error.statusText+','+error.error.data);
            this.router.navigate(['./view/signup']);
          })
        } else if (result.error) {
          // Error creating the token
         this.dealError();
        }
      },error=>{
        this.dealError();
      });
    // this.payService.haveRequestPayment=true;
    // this.router.navigate(['./view/result'])
  }
  dealError(){
    this.isInRequesting=false;
  }
  Review(event){
    this.router.navigate(['./view/confirm']);
  }
}
