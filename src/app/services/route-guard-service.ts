import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { InfoMationService } from './infomation.service';
@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate{

  constructor(
    private router: Router,
    private infomationService:InfoMationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    var path = route.routeConfig.path;  
    const nextRoute = ['view/signup','view/confirm', 'view/payment', 'view/result'];
    // let isLogin = userModel.isLogin;  // 是否登录
    // 当前路由是nextRoute指定页时
    if (nextRoute.indexOf(path) >= 0) {
      if(path==='view/result'){
        if(this.infomationService.haveRequestPayment){
          return true;
        }else{
          this.router.navigate(['./view/signup'])
          return false;
        }
      }
      if(path==='view/payment'||path==='view/confirm'){//
        let valid=false;
        if(this.infomationService.checkValid()){
          return true;
        }else{
          this.router.navigate(['./view/signup'])
          return false;
        }
      }
      if(path==='view/signup'){
        if(this.infomationService.index_infomationHaveRead){
          return true;
        }else{
          this.router.navigate(['./view/index']);
          return false;
        }
      }
    }
    return true;
  }

}