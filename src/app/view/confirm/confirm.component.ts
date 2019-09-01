import { Component, OnInit } from '@angular/core';
import { InfoMationService } from '../../services/infomation.service';
import { Router } from '@angular/router';
import { RequestService} from '../../services/request.service';
// import apiConifg from '../../../assets/api.json';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  constructor(
    public infomationService:InfoMationService,
    private router:Router,
    private requestService:RequestService
  ) { }

  ngOnInit() {
  }
  signupEvent(){
    console.log('..signupEvent...')
    // this.router.navigate(['./view/payment']);
    let params={
      amount:this.infomationService.signup_form.total,
      code:this.infomationService.signup_form.code,
      companyAddress:this.infomationService.signup_form.address,
      companyName:this.infomationService.signup_form.companyname,
      email:this.infomationService.signup_form.email,
      firstName:this.infomationService.signup_form.firstname,
      lastName:this.infomationService.signup_form.lastName,
      key:this.infomationService.signup_form.key,
      numberLicenses:this.infomationService.signup_form.count,
      phoneNumber:this.infomationService.signup_form.phone

    }
    // let paramStr='?';
    // let keys=Object.keys(params);
    // for(let i=0;i<keys.length;i++){
    //   let key=keys[i];
    //   paramStr+=key+"="+params[key]+'&'
    // }
    // paramStr=paramStr.substr(0,paramStr.length-1);

    this.requestService.post(this.infomationService.apiConfig.signup.url+this.requestService.getParamStr(params),params).subscribe(result=>{
      console.log(result);
      this.infomationService.signup_form.uid=result['data'].uid;
      this.router.navigate(['./view/payment']);
    },error=>{
      this.infomationService.setInfomationCorrect();
      this.Review(null);
    })
  }
  Review(event){
    this.router.navigate(['./view/signup']);
  }
}
