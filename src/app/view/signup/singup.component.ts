import { Component, OnInit } from '@angular/core';
import { InfoMationService } from '../../services/infomation.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { ValidateBase } from '../validBase';
declare var grecaptcha;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  
  validationMessage:any={
    companyname: {
      required:'Please enter your company name',
      minLength:'Minimum length is 3 English characters'
    },
    address:  {
      required:'Please enter your company address',
      minLength:'Minimum length is 5 English characters'
    },
    firstname: {
      required:'Please enter your company address',
      minLength:'Minimum length is 2 English characters'
    },
    lastname: {
      required:'Please enter your company address',
      minLength:'Minimum length is 2 English characters'
    },
    email: {
      required:'Please enter email'
    },
    code: {
      required:'Please enter email verification code'
    },
    key: {
      required:'No callback information was received'
    },
    phone: {
      required:'Please enter your phone number'
    },
    count:{
      required:'Please enter number'
    },
    total:{
      required:'Please enter number'
    },
  }
  public valueChangeTimeout=null;
  public verifyEmailBtnDisable:boolean=false;
  private verifyEmailBtnIntervel:any=null;
  public verifyEmailBtnSeconds:number=60;
  constructor(
    public infomationService:InfoMationService,
    private formBuilder: FormBuilder,
    private requestService:RequestService,
    private router:Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      companyname: ['', [Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
      address: ['', [Validators.required,Validators.minLength(5)]],
      firstname: ['', [Validators.required,Validators.minLength(2)]],
      lastname: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      code:['',Validators.required],
      key:['',Validators.required],
      phone: ['', [Validators.required,ValidateBase.isNumber]],
      count:['', [Validators.required,ValidateBase.countValid]],
      total:['', [Validators.required,ValidateBase.countValid]],
    });
    this.signupForm.valueChanges.subscribe(data=>{
      if(this.valueChangeTimeout)clearTimeout(this.valueChangeTimeout);
      this.valueChangeTimeout=setTimeout(()=>{this.onValueChange(data)});
    });
    if(window['recaptchaLoaded']){
      this.recaptchaLoaded();
    }else{
      window['signup-component']=this;
      window['callBack']=this.recaptchaLoaded;
    }
    //获取币种和密钥
    this.requestService.get('/payment/checkout',{}).subscribe(result=>{
      // console.log(data);
      this.infomationService.currency=result['data'].currency;
      this.infomationService.stripePublicKey=result['data'].stripePublicKey;
    })  
  }
  recaptchaLoaded(){
    let that=this;
    let widgetId1 = grecaptcha.render('recaptchaContainer', {
      'sitekey' : '6LeNBLIUAAAAAOjH5qRyqtAEdHhUFaXksAU0u-R-',
      'callback' : (response)=>{
        let that=window['signup-component'];
        that.verifyCallback(response);
      },
      'theme' : 'light'
    });
  }
  verifyCallback(response){
    this.requestService.get('/payment/recaptcha',{userResponse:response}).subscribe(result=>{
      let data=JSON.parse(result['data']);
      this.infomationService.signup_form.isNotRobot=data.success
    })
  }
  onValueChange(data){
    let isAllValid=true;
    for (const field in this.infomationService.formValid) {
      // if(field==='isNotRobot')debugger;
      this.infomationService.formValid[field]['error']='';
      let control=this.signupForm.get(field);
      // debugger;
      if (control && (control.dirty||control.errors&&control.errors['invalid'])&& !control.valid) {
        const messages = this.validationMessage[field];
        this.infomationService.formValid[field]['valid']=false;
        isAllValid=false;
        for (const key in control.errors) {
          this.infomationService.formValid[field]['error'] += messages[key] + '\n';
         }
      }else{
        // if(this.infomationService.signup_form[field]){
          this.infomationService.formValid[field]['valid']=true;
        // }else{
        //   isAllValid=false;
        //   this.infomationService.formValid[field]['valid']=false;
        // }
        
      }
    }
    if(this.infomationService.signup_form.email!==''&&this.infomationService.formValid.email.valid){
      this.infomationService.signup_email_getcodebtn_disabled=false;
    }else{
      this.infomationService.signup_email_getcodebtn_disabled=true;
    }
    this.infomationService.signup_submiteBtn_disabled=!isAllValid;
  }
  
  nextPage(){
    this.onValueChange(null);
    if(this.infomationService.checkValid()){
      this.router.navigate(['./view/confirm']);
    }
  }
  getTotalProce(){
    let count=this.infomationService.signup_form.count;
    if(count>0){
      this.requestService.get('/payment/amount',{'number':count}).subscribe(result=>{
        this.infomationService.signup_form['total']=parseFloat(result['data']['amount']);
        this.infomationService.formValid.total.valid=true;
      })
    }
  }
  getEmailVerifyCode(){
    this.verifyEmailBtnDisable=true;
    this.verifyEmailBtnIntervel=setInterval(()=>{
      this.verifyEmailBtnSeconds--;
      if(this.verifyEmailBtnSeconds==0){
        this.verifyEmailBtnDisable=false;
        this.verifyEmailBtnSeconds=60;
        clearInterval(this.verifyEmailBtnIntervel);
      }
    },1000)
    this.requestService.get('/payment/code',{'email':this.infomationService.signup_form.email}).subscribe(result=>{
      console.log(result['data'].key)
      this.infomationService.signup_form.key=result['data'].key;
    },error=>{
      console.error(error)
    })
  }
}
