export class Validator{
  constructor(
  ){
  }
  public static isNotEmpty(name,value,formValid){
    if(value!==''){
      formValid[name].valid=true;
    }else{
      formValid[name].valid=false;
    }
  }
  public static isNotContainSpace(name,value,formValid){
    if(value!==''){
      formValid[name].valid=true;
    }else{
      formValid[name].valid=false;
    }
    if(value.indexOf(' ')>=0){
      formValid[name].valid=false;
    }
  }
  public static isEmail(name,value,formValid){
    var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
		if(reg.test(value)){
      formValid[name].valid=true;
    }else{
      formValid[name].valid=false;
    }
  }
  public static isNumber(name,value,formValid){
    if(value===''){
      formValid[name].valid=false;
    }else{
      if(typeof(value)==='number'&&value>0){
        formValid[name].valid=true;
      }else{
        formValid[name].valid=false;
      }
    }
  }
  public static isPhone(name,value,formValid){
    if(typeof(value)==='number'){
      formValid[name].valid=true;
    }else{
      for(let i=0;i<value.length;i++){
        let num=parseInt(value[i])
        if((!num&&num!==0)&&['-','/'].indexOf(value[i])<0){
          formValid[name].valid=false;
        }else{
          formValid[name].valid=true;
        }
      }
    }
    
    return null;  
  }
}