import { Injectable } from '@angular/core';
import textConfig from '../../assets/text.json';
import apiJson from '../../assets/api.json';
import { RequestService } from './request.service';
@Injectable({
  providedIn: 'root'
})
export class InfoMationService {
  public index_infomationHaveRead:boolean=false;
  public appInstance:any=null;
  public infomation_correct:boolean=true;
  public signup_email_getcodebtn_disabled:boolean=true;
  public signup_priceBtn_disabled:boolean=true;//default
  public signup_submiteBtn_disabled:boolean=true;//default
  public signup_form:any={
    companyname:"",
    address:"",
    firstname:"",
    lastname:"",
    email:"",
    code:"",
    key:"",
    phone:"",
    isNotRobot:false,
    count:0,
    total:0,
    uid:""
  }
  public formValid = {
    companyname:{
      placeholder:textConfig.signup.form.companyname.placeholder,
      error:textConfig.signup.form.companyname.error,
      validator:"isNotEmpty",
      valid:true
    },
    address:{
      placeholder:textConfig.signup.form.address.placeholder,
      error:textConfig.signup.form.address.error,
      validator:"isNotEmpty",
      valid:true
    },
    firstname:{
      placeholder:textConfig.signup.form.firstname.placeholder,
      error:textConfig.signup.form.firstname.error,
      validator:"isNotEmpty",
      valid:true
    },
    lastname:{
      placeholder:textConfig.signup.form.lastname.placeholder,
      error:textConfig.signup.form.lastname.error,
      validator:"isNotEmpty",
      valid:true
    },
    email:{
      placeholder:textConfig.signup.form.email.placeholder,
      error:textConfig.signup.form.email.error,
      validator:"isEmail",
      valid:true
    },
    code:{
      placeholder:textConfig.signup.form.code.placeholder,
      error:textConfig.signup.form.code.error,
      validator:"isNumber",
      valid:true
    },
    key:{
      placeholder:"",
      error:textConfig.signup.form.verificationBtn.error,
      valid:true
    },
    phone:{
      placeholder:textConfig.signup.form.phone.placeholder,
      error:textConfig.signup.form.phone.error,
      validator:"isPhone",
      valid:true
    },
    isNotRobot:{
      error:textConfig.signup.form.isNotRobot.error,
      valid:true
    },
    count:{
      placeholder:textConfig.signup.form.licenses.placeholder,
      error:textConfig.signup.form.licenses.error,
      validator:"isNumber",
      valid:true
    },
    total:{
      placeholder:"",
      error:textConfig.signup.form.total.error,
      validator:"isNumber",
      valid:true
    }
  };
  public currency:string='';
  public stripePublicKey:string='';

  public haveRequestPayment:boolean=false;
  public payResult:boolean=false;
  public htmlText:any=textConfig;
  public apiConfig:any=null;
  constructor(
    private requestService:RequestService
  ) {
    requestService.get('./assets/text.json',{}).subscribe((textConfig:any)=>{
      console.log(textConfig) 
      this.formValid['companyname'].placeholder=textConfig.signup.form.companyname.placeholder;
      this.formValid['companyname'].error=textConfig.signup.form.companyname.error;
      this.formValid['address'].placeholder=textConfig.signup.form.address.placeholder;
      this.formValid['address'].error=textConfig.signup.form.address.error;
      this.formValid['firstname'].placeholder=textConfig.signup.form.firstname.placeholder;
      this.formValid['firstname'].error=textConfig.signup.form.firstname.error;
      this.formValid['lastname'].placeholder=textConfig.signup.form.lastname.placeholder;
      this.formValid['lastname'].error=textConfig.signup.form.lastname.error;
      this.formValid['email'].placeholder=textConfig.signup.form.email.placeholder;
      this.formValid['email'].error=textConfig.signup.form.email.error;
      this.formValid['code'].placeholder=textConfig.signup.form.code.placeholder;
      this.formValid['code'].error=textConfig.signup.form.code.error;
      this.formValid['key'].error=textConfig.signup.form.verificationBtn.error;
      this.formValid['phone'].placeholder=textConfig.signup.form.phone.placeholder;
      this.formValid['phone'].error=textConfig.signup.form.phone.error;
      this.formValid['isNotRobot'].error=textConfig.signup.form.phone.error;
      this.formValid['count'].placeholder=textConfig.signup.form.licenses.placeholder;
      this.formValid['count'].error=textConfig.signup.form.licenses.error;
      this.formValid['total'].placeholder='';
      this.formValid['total'].error=textConfig.signup.form.total.error;
      this.htmlText=textConfig;
    })
    // requestService.get('./assets/api.json',{}).subscribe((:any)=>{

    // })
  }
  getApiConfig(){
    return new Promise((success,error)=>{
      if(this.apiConfig){
        success(this.apiConfig)
      }else{
        this.requestService.get('./assets/api.json',{}).subscribe((result:any)=>{
          this.apiConfig=result;
          success(result)
        })
      }
    })
    
  }
  checkValid(){
    let fileds=Object.keys(this.formValid);
    let isValid=true;
    for(let i=0;i<fileds.length;i++){
      let filed=fileds[i];
      if(this.signup_form[filed]===''){
        this.formValid[filed]['valid']=false;
      }
      if((filed==='count'||filed==='total')&&(this.signup_form[filed]===0)){
        this.formValid[filed]['valid']=false;
      }

      if(!this.formValid[filed]['valid']){
        isValid=false;
      }
    }
    if(isValid){
      this.signup_submiteBtn_disabled=false;
    }else{
      this.signup_submiteBtn_disabled=true;
    }
    console.log('////////')
    console.log(isValid)
    return isValid;
  }
  setInfomationCorrect(){
    if(this.appInstance){
      this.appInstance.showError(
        this.htmlText.signup.signupInfomationError
      )
    }
  }
  setPayResult(text){
    // this.payResult=false;
    // setTimeout(()=>{
    //   this.payResult=true;
    // },5000)
    if(this.appInstance){
      this.appInstance.showError(
        text||this.htmlText.payment.paymentError
      )
    }
  }
  setApp(app){
    this.appInstance=app;
  }
}
