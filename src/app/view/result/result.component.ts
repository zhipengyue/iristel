import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayService } from '../../services/pay.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public resultStatus:string='Successful payment';
  constructor(
    private router:Router,
    public payService:PayService
  ) { }

  ngOnInit() {
  }
  redo(){
    window.history.go(-1);
  }
}
