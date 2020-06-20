import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { AnswerModel } from '../networking/postanswermodel';


@Injectable()
export class QuestionnairApiService {
  body: any = {};
  SavKey:string="";
  SavName:string="";
  CustKeyFlag:boolean=false;
  datatoPost=[];
  dataaddtemp=[];
  dataVar = [];
  private getURL='assets/tabsfile.json';
  constructor(private http:Http) { }
 
  public setCustKeyFlag(CustKeyFlag: boolean) : void
  {

    this.CustKeyFlag=CustKeyFlag;
  }

  public setSavKey(savekey: string) : void
  {

    this.SavKey=savekey;
  }

  checkingSavekeyData(savkey)

  {   
    console.log("service call");
    var URL = "http://localhost:3000/api/cisco1ea/questionnaire/get_quest";
    this.body = { "savkey": savkey};
    
       return this.http.post(URL, this.body).map(res => res.json())
       
  }

  public getCustQuestData(savkey){
 
    var URL = "http://localhost:3000/api/cisco1ea/customer/get_quest";
    this.body = { "savkey": savkey};
    return this.http.post(URL, this.body).map((res: Response) => res.json());
  }
  
  getData()
  {
    return this.http.get('assets/tabsfile.json');
  }

  getsecurityData()
  {
    return this.http.get('assets/securityData.json');
  }

  AddformData(dataobj){
    this.dataaddtemp=[];
    console.log(dataobj.length); 
      for(let i =0;i< dataobj.length; i++){
          this.dataaddtemp.push(dataobj[i]);
      }
       this.datatoPost = this.datatoPost.concat(dataobj);
       
      console.log("data to post:",JSON.stringify(this.datatoPost));      
    }
 getQvarfromData()
 {
  let dataVar2=[];
  this.datatoPost.forEach( x =>{
    // console.log(x["Q_VAR"]);
    dataVar2.push(x["Q_VAR"]);
  })
  this.dataVar=this.dataVar.concat(dataVar2);
  console.log("total data q var"+this.dataVar);
  return this.dataVar;
 }

 clickedVAR(vr)
 {
   let dataVar1 = [];
   dataVar1=this.getQvarfromData();
   console.log(vr,"var",dataVar1,"check var",dataVar1.includes(vr));
   var a = dataVar1.indexOf(vr)
   return a;
 }
  getUSERData()
  {
    return this.http.get('assets/responseUser.json');
  }


 
}
