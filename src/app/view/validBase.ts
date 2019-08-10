import { FormControl,ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
export class ValidateBase{
  public static countValid(input: FormControl){
      let v = input.value;
      if(typeof(input.value)!=='number')return {"invalid":true}
      if(v>0){
        return null;
      }else{
        return {'invalid':true};
      }
  }
  public static isNumber(input: FormControl){
    let str = input.value;
    if(typeof(str)==='number')return null;
    for(let i=0;i<str.length;i++){
      if(!parseInt(str[i])&&['-','/'].indexOf(str[i])<0){
        return {"invalid":true}
      }
    }
    return null;  
  }
  public static isTrue(input: FormControl){
    let str = input.value;
    if(str==='true'||str===true){
      return null;
    }else{
      return {"invalid":true}
    }
  }
}