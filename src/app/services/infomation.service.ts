import { Injectable } from '@angular/core';
import textConfig from '../../assets/text.json';
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
      error:textConfig.signup.form.firstname.placeholder,
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
  constructor() { }

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
