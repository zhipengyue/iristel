import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpRequest,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // public baseServerUrl:string=environment.production?'':'';
  constructor(
    private httpClient:HttpClient
  ) { }
 
  get(url,data): Observable<Object>{
    let params=new HttpParams();
    let keys=Object.keys(data);
    for(let i=0;i<keys.length;i++){
      let key=keys[i];
      params=params.set(key,data[key]);
    }
    console.log(params);
    return this.httpClient.get(url,{params});
  }
  post(url,data): Observable<Object>{
    return this.httpClient.post(url,data);
  }
  getParamStr(params){
    let paramStr='?';
    let keys=Object.keys(params);
    for(let i=0;i<keys.length;i++){
      let key=keys[i];
      paramStr+=key+"="+params[key]+'&'
    }
    paramStr=paramStr.substr(0,paramStr.length-1);
    return paramStr;
  }
}
