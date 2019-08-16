import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoMationService {
  public infomation_correct:boolean=true;
  public signup_email_getcodebtn_disabled:boolean=true;
  public signup_priceBtn_disabled:boolean=true;//default
  public signup_submiteBtn_disabled:boolean=true;//default
  public signup_form:any={
    companyname:'',
    address:'',
    firstname:'',
    lastname:'',
    email:'',
    code:'',
    key:'',
    phone:'',
    isNotRobot:false,
    count:0,
    total:0,
    uid:''
  }
  public formValid = {
    companyname:{
      placeholder:'Please enter your company name',
      error:'Is not can be empty',
      validator:'isNotEmpty',
      valid:true
    },
    address:{
      placeholder:'Please enter your company address',
      error:'Is not can be empty',
      validator:'isNotEmpty',
      valid:true
    },
    firstname:{
      placeholder:'Please enter your firstName',
      error:'Is not can be empty',
      validator:'isNotEmpty',
      valid:true
    },
    lastname:{
      placeholder:'Please enter your lastName',
      error:'Is not can be empty',
      validator:'isNotEmpty',
      valid:true
    },
    email:{
      placeholder:'Please enter your email',
      error:'Is not can be empty and check that the email address is correct',
      validator:'isEmail',
      valid:true
    },
    code:{
      placeholder:'Please enter the validation code you received in your mailbox',
      error:'Is not can be empty and just is number',
      validator:'isNumber',
      valid:true
    },
    key:{
      placeholder:'',
      error:'Please re-verify your mailbox',
      valid:true
    },
    phone:{
      placeholder:'Please enter your phone number ',
      error:'The phone numbers is not can be empty and just contain "0~9" and "-" or "/"',
      validator:'isPhone',
      valid:true
    },
    isNotRobot:{
      error:'Human-computer interaction validation has been reset and needs to be re-validated',
      valid:true
    },
    count:{
      placeholder:'Please enter count what you want to buy',
      error:'Is not can be empty and just is number',
      validator:'isNumber',
      valid:true
    },
    total:{
      placeholder:'',
      error:'Please recapture the total price',
      validator:'isNumber',
      valid:true
    }
  };
  public currency:string='';
  public stripePublicKey:string='';

  public haveRequestPayment:boolean=false;
  public payResult:boolean=false;
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
    this.infomation_correct=false;
    setTimeout(()=>{
      this.infomation_correct=true;
    },5000)
  }
  setPayResult(){
    this.payResult=false;
    setTimeout(()=>{
      this.payResult=true;
    },5000)
  }
}
