import { Component,ViewEncapsulation } from '@angular/core';
import { InfoMationService } from './services/infomation.service'
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'iristel';
  public errorText:string='';
  constructor(
    private infomationService:InfoMationService
  ){
    this.infomationService.setApp(this)
    // setTimeout(()=>{
    //   console.log('start tiem');
    //   this.showError(this.infomationService.htmlText.signup.signupInfomationError)
    // },1000*5)
  }
  showError(error){
    this.errorText=error;
    $("#alertContent").css('transform','translate(-50%,0)');
    setTimeout(()=>{
      $("#alertContent").css('transform','translate(-50%,-100%)');
    },1000*10)
  }
}
