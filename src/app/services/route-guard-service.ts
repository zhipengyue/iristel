import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { PayService } from './pay.service';
import { InfoMationService } from './infomation.service';
@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate{

  constructor(
    private router: Router,
    private payService:PayService,
    private infomationService:InfoMationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    var path = route.routeConfig.path;  
    const nextRoute = ['view/confirm', 'view/payment', 'view/result'];
    // let isLogin = userModel.isLogin;  // 是否登录
    // 当前路由是nextRoute指定页时
    if (nextRoute.indexOf(path) >= 0) {
      if(path==='view/result'){
        if(this.payService.haveRequestPayment){
          return true;
        }else{
          this.router.navigate(['./view/signup'])
          return false;
        }
      }
      if(path==='view/confirm'){//path==='view/payment'||
        let valid=false;
        if(this.infomationService.checkValid()){
          return true;
        }else{
          this.router.navigate(['./view/signup'])
          return false;
        }
      }
    }
    return true;
  }

}