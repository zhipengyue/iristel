import { Component, OnInit } from '@angular/core';
import { InfoMationService } from '../../services/infomation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    public infomationService:InfoMationService,
    private router:Router
  ) { }

  ngOnInit() {

  }
  signUp(event){
    console.log('////')
    this.infomationService.index_infomationHaveRead=true;
    this.router.navigate(['./view/signup']);
  }
}
