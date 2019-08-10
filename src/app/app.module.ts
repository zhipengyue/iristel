import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './view/signup/singup.component';
import { PaymentComponent } from './view/payment/payment.component';
import { ResultComponent } from './view/result/result.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './view/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PaymentComponent,
    ResultComponent,
    ConfirmComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_qyKY3G6TQGtOrrnfULZ16Ez3'),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
