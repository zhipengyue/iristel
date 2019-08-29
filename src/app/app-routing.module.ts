import { NgModule} from '@angular/core';
import { Routes, RouterModule,ExtraOptions} from '@angular/router';
import { SignupComponent } from './view/signup/singup.component';
import { PaymentComponent } from './view/payment/payment.component';
import { ResultComponent } from './view/result/result.component';
import { ConfirmComponent } from './view/confirm/confirm.component';
import { RouteguardService } from './services/route-guard-service';
import { IndexComponent } from './view/index/index.component';
const routes: Routes = [
  {path:'',redirectTo:'view/signup',pathMatch:'full'},
  {path:'view/signup',component:SignupComponent,canActivate:[RouteguardService]},
  {path:'view/payment',component:PaymentComponent,canActivate:[RouteguardService]},
  {path:'view/result',component:ResultComponent,canActivate:[RouteguardService]},
  {path:'view/confirm',component:ConfirmComponent,canActivate:[RouteguardService]},
  {path:'view/index',component:IndexComponent}
];

const config:ExtraOptions={
  useHash:true
}
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
