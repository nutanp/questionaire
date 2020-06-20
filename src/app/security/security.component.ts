import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';

import { AnswersService } from '../answers.service';
import { QuestionairModel } from '../networking/NetworkingModel';
import { QuestionnairApiService } from '../service/questionnair-api.service';
import { AnswerModel } from '../networking/postanswermodel';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  constructor(public http:Http,public AnswersService:AnswersService,private APIservice:QuestionnairApiService){  }
  progress:number=0;
  postobj={};
  selectedEntry:any;
  questioncount:any;
  progresspercentage:number;
  QidCount:number=0;
  PrintJsonQuest : QuestionairModel[];
  StaticJsonQuest : QuestionairModel[];
  StaticJsonQuestarr=[];
  dummyData : QuestionairModel[];
  SAVKEY:string;
  postAnswer:AnswerModel[]=[];
 data=[];
 securityArray=[];
  body: any = {};
  onFormSubmit(event: any, model: any)
    {  
      console.log(' model ' + JSON.stringify(model));
      for (var key in model) {
                 console.log(key + " -> " + model[key]);
         }
     // for()
      //const filteredOptions = JSON.stringify(model);
   this.AnswersService.setSecurityformvalue( JSON.stringify(model));
   //console.log(JSON.stringify(networkSurvey));
    
  }
  securityEvent()
  {
    let element:HTMLElement=document.getElementById('SecuritySubmit') as HTMLElement;
    element.click();
    //alert("parnet calling");
  }
  tabsArray:QuestionairModel;
  tabsArraycount=[];
  ngOnInit() {
    this.getTabs();
    this.getCount();
  }

  onSelectionChange(entry,questvar) {
    // this.selectedEntry.ansVar = entry.ansVar;
    this.postobj={};
     console.log(entry,"questtion",questvar);
     this.progress= this.progress+1;
    
     this.postobj['sav_key']=this.APIservice.SavKey;
     this.postobj['Q_VAR']=questvar;
     this.postobj['Q_VAL']=true;
     this.postobj['ANS_VAR']=entry.ansVar;
     this.postobj['ANS_VAL']="TRUE";
     this.APIservice.AddformData( this.postobj);
    // console.log( this.postobj);
     this.progresspercentage=Math.round((this.progress/this.QidCount)*100)
 }

  getTabs(){
     // console.log('Completed');
     this.http.get('assets/securityData.json').map(res => res.json())
    .subscribe(
      tabsArray => this.tabsArray = tabsArray,
      error => console.error('Error: ' + error),
      () => console.log(this.tabsArray[0].content[0])
    )

  }
  getCount()
{ 
  this.APIservice.getsecurityData().subscribe(response=>{
  this.tabsArraycount=response.json();
  for (let i = 0; i < this.tabsArraycount.length; i++) {
    //console.log( this.tabsArray[i].content);
    for(let j = 0; j < this.tabsArraycount[i].content.length; j++)
    {
      this.QidCount=this.QidCount+1;
      // console.log( this.tabsArray[i].content[j].QVar);
    }

  }
 
  return this.QidCount;
  });
}

getCustData()
{ //adding temporary json filereading logic

  this.APIservice.getUSERData().subscribe(data=>{
   this.securityArray=data.json();

  // this.APIservice.getCustQuestData(1).subscribe(data=>{
  //   this.customerArray = data;
      
    this.securityArray.map( res => {
      this.dummyData.map( quest => {
        // console.log( "quest:::", quest);
        quest.content.map(dQuest => {
          // console.log( "ans:::", dQuest);
          dQuest.Answer.map(dAns => {
            // console.log( "dAns:::", dAns);
            if(dAns.ansVar === res.ANS_VAR){
              // console.log( "bool:::", dAns.ansVar );
              dAns.ansVal=res.ANS_VAL;
            }
            
          })
        })
      })
      this.PrintJsonQuest= this.dummyData;
      console.log("dummy",JSON.stringify(this.dummyData));
      //console.log("print",JSON.stringify(this.PrintJsonQuest));
      // 

    })
   
  })
  
}


getResponseData()
 {
  this.APIservice.getsecurityData().subscribe(response=>{
    this.data=response.json();
    this.StaticJsonQuestarr = this.data;
    this.dummyData=this.StaticJsonQuestarr;
    console.log("service method",this.APIservice.CustKeyFlag);
   // if(this.APIservice.CustKeyFlag)
   if(this.APIservice.SavKey=="1")
    { 
      
      this.getCustData();
      console.log("we r in true response:");
      //this.PrintJsonQuest= this.dummyData;
    console.log("we r in true response security:",JSON.stringify(this.dummyData));
    }
   else
   {
   // console.log("we r in false response:",JSON.stringify(this.StaticJsonQuest));
    this.StaticJsonQuestarr= this.StaticJsonQuestarr;
  }
  })

 
 }

}