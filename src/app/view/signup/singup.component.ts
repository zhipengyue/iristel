import { Component, OnInit } from '@angular/core';
import { InfoMationService } from '../../services/infomation.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { Validator } from '../../services/validator';
// import apiConifg from '../../../assets/api.json';
declare var grecaptcha;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  public valueChangeTimeout=null;
  public verifyEmailBtnDisable:boolean=false;
  private verifyEmailBtnIntervel:any=null;
  public verifyEmailBtnSeconds:number=60;
  private recaptchaWigetId:any=null;
  public emailCodeRequesting:boolean=false;
  public totalPrice:string='';
  // private apiConifg:any=null;
  constructor(
    public infomationService:InfoMationService,
    private formBuilder: FormBuilder,
    private requestService:RequestService,
    private router:Router
  ) { }

  ngOnInit() {
    
    if(window['recaptchaLoaded']){
      this.recaptchaLoaded();
    }else{
      window['signup-component']=this;
      window['callBack']=this.recaptchaLoaded;
    }
    this.infomationService.getApiConfig().then((apiConifg:any)=>{
      this.requestService.get(apiConifg.checkout.url,{}).subscribe(result=>{
        this.infomationService.currency=result['data']['currency'];
        this.infomationService.stripePublicKey=result['data']['stripePublicKey']
      })
    })
    
  }
  recaptchaLoaded(){
    let that=window['signup-component']||this;
    that.infomationService.getApiConfig().then((apiConifg:any)=>{
      that.recaptchaWigetId = grecaptcha.render('recaptchaContainer', {
        'sitekey' : apiConifg.recaptchaKey,//'6LeNBLIUAAAAAOjH5qRyqtAEdHhUFaXksAU0u-R-',
        'callback' : (response)=>{
          that.verifyCallback(response);
        },
        'theme' : 'light'
      });
    });
  }
  verifyCallback(response){
    this.requestService.get(this.infomationService.apiConfig.recaptcha.url,{userResponse:response}).subscribe(result=>{
      let data=JSON.parse(result['data']);
      this.infomationService.signup_form.isNotRobot=data.success;
      this.infomationService.formValid.isNotRobot.valid=true;
      this.infomationService.checkValid();
    })
  }
  checkValue(itemName,eventTarget=null){
    if(itemName==='count'){
      let count=parseInt(this.infomationService.signup_form.count);
      setTimeout(()=>{
        this.infomationService.signup_form.count=count;
      },0)
      
    }
    if(itemName!=='code'){
      let value=this.infomationService.signup_form[itemName];
      let validatorCaller=this.infomationService.formValid[itemName]['validator'];
      Validator[validatorCaller](itemName,value,this.infomationService.formValid);
      this.infomationService.checkValid();
    }else{
      if(this.infomationService.signup_form.key){
        if(eventTarget==='focusout')return;//repeat request
        if(this['checkCodeTimeout'])clearTimeout(this['checkCodeTimeout']);
        this['checkCodeTimeout']=setTimeout(()=>{
          this.requestService.get(this.infomationService.apiConfig.checkCode.url,{code:this.infomationService.signup_form.code,key:this.infomationService.signup_form.key}).subscribe(result=>{
            this.infomationService.formValid[itemName].valid=result['data']['check'];
            if(result['data']['check']){
              this.verifyEmailBtnDisable=false;
              this.verifyEmailBtnSeconds=60;
              clearInterval(this.verifyEmailBtnIntervel);
              this.infomationService.checkValid();
            }
          })
        },300)
        
      }else{
        this.infomationService.formValid[itemName].valid=false;
      }
    }
  }

  nextPage(){
    if(this.infomationService.checkValid()){
      this.router.navigate(['./view/confirm']);
    }else{
      grecaptcha.reset(this.recaptchaWigetId);
      this.infomationService.signup_submiteBtn_disabled=true;
    }
  }
  getTotalProce(){
    let count=this.infomationService.signup_form.count;
    if(count>0){
      this.requestService.get(this.infomationService.apiConfig.amount.url,{'number':count}).subscribe(result=>{
        this.infomationService.signup_form['total']=parseFloat(result['data']['amount']);
        this.infomationService.formValid.total.valid=true;
        let num=parseFloat(result['data']['amount'])/100;
        this.totalPrice=num.toFixed(2);
        this.infomationService.checkValid();
        console.log(this.infomationService.formValid);
      })
    }
  }
  getEmailVerifyCode(disable){
    if(disable)return;
    this.emailCodeRequesting=true;
    this.verifyEmailBtnDisable=true;
    this.verifyEmailBtnIntervel=setInterval(()=>{
      this.verifyEmailBtnSeconds--;
      if(this.verifyEmailBtnSeconds==0){
        this.verifyEmailBtnDisable=false;
        this.verifyEmailBtnSeconds=60;
        clearInterval(this.verifyEmailBtnIntervel);
      }
    },1000)
    this.requestService.get(this.infomationService.apiConfig.code.url,{'email':this.infomationService.signup_form.email,'firstName':this.infomationService.signup_form.firstname}).subscribe(result=>{
      console.log(result['data'].key)
      this.infomationService.signup_form.key=result['data'].key;
      this.infomationService.formValid.key.valid=true;
      this.infomationService.checkValid();
      this.emailCodeRequesting=false;
    },error=>{
      this.infomationService.checkValid();
      this.infomationService.formValid.key.valid=false;
      this.emailCodeRequesting=false;
    })
  }
}
