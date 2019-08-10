import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoMationService {
  public signup_email_getcodebtn_disabled:boolean=true;
  public signup_priceBtn_disabled:boolean=true;//default
  public signup_submiteBtn_disabled:boolean=true;//default
  public signup_form:any={
    companyname:'Micorosoft ..',
    address:'Beijing shuanghuaili 6.21',
    firstname:'zhi',
    lastname:'pengyue',
    email:'121585219@qq.com',
    code:'123',
    key:'fafda',
    phone:'',
    isNotRobot:false,
    count:0,
    total:0,
    uid:''
  }
  public formValid = {
    companyname:{
      error:'',
      valid:true
    },
    address:{
      error:'',
      valid:true
    },
    firstname:{
      error:'',
      valid:true
    },
    lastname:{
      error:'',
      valid:true
    },
    email:{
      error:'',
      valid:true
    },
    code:{
      error:'',
      valid:true
    },
    key:{
      error:'',
      valid:true
    },
    phone:{
      error:'',
      valid:true
    },
    count:{
      error:'',
      valid:false
    },
    total:{
      error:'',
      valid:true
    }
  };
  public currency:string='';
  public stripePublicKey:string='';
  constructor() { }

  checkValid(){
    let fileds=Object.keys(this.formValid);
    let isValid=true;
    for(let i=0;i<fileds.length;i++){
      let filed=fileds[i];
      if(!this.formValid[filed]['valid']){
        isValid=false;
        break;
      }
    }
    return isValid;
  }
}
