import { Component, OnInit } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { NgForm } from '@angular/forms';
import { QuestionairModel } from './NetworkingModel';
import { AnswerModel } from './postanswermodel';
import { AnswersService } from '../answers.service';
import { QuestionnairApiService } from '../service/questionnair-api.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.css']
})
export class NetworkingComponent implements OnInit {
  constructor(private http:Http,private APIservice:QuestionnairApiService,public AnswersService:AnswersService,private activatedRoute: ActivatedRoute){  }
   progress:number=1;
   data=[];
   selectedEntry:any;
   questioncount:any;
   progresspercentage:number;
   posts=[];
   ids:any;
   QidCount:number=0;
   tabsArray=[];
   customerArray=[];
   PrintJsonQuest : QuestionairModel[];
   StaticJsonQuest : QuestionairModel[];
   dummyData : QuestionairModel[];
   SAVKEY:string;
   postAnswer:AnswerModel[]=[];
   postobj={};
   body: any = {};
   questResponse=[];

  onFormSubmit(event: any, model: any)
  { 
    var Jsonstr=this.APIservice.datatoPost;
    var URL = "http://localhost:3000/api/cisco1ea/questionnaire/save/qanda";
    this.body =Jsonstr;
  
     //this.body = [{"SAV_KEY":"7","Q_VAR":"Q_VAR","Q_VAL":"TRUE","ANS_VAR":"BQ_VAR1","ANS_VAL":"TRUE"},{"SAV_KEY":"7","Q_VAR":"BQ_Q_DIRECT_INTERNET_CONNECTION","Q_VAL":"TRUE","ANS_VAR":"BQ_DIRECT_INTERNET_CONNECTION_YES","ANS_VAL":"TRUE"},{"SAV_KEY":"7","Q_VAR":"3_Net_branch","Q_VAL":"TRUE","ANS_VAR":"3_3_Net_branch","ANS_VAL":"TRUE"}]
    //console.log("posting here data" ,this.body);
   // return this.http.post(URL, this.body).map((res: Response) => res.json());
   return  this.http.post(URL, this.body).map((res: Response) => res.json()).subscribe(data => {
      this.data = data;
    })
  }
    // {  
    //   console.log(JSON.stringify(model));
    //   for (var key in model) {
    //              console.log(key + " -> " + model[key]);
    //      }
    //  // for()
    //   //const filteredOptions = JSON.stringify(model);
   //this.AnswersService.setNetworkformvalue( JSON.stringify(model));
   //console.log(JSON.stringify(networkSurvey));
    
  
testevent()
  {
    let element:HTMLElement=document.getElementById('Networksubmit') as HTMLElement;
    element.click();
    
  }

  ngOnInit() {
    //this.getTabs();
    // this.activatedRoute.paramMap
    //     .subscribe(params=>{
    //       console.log("displaying param key:",params);
    //     })
      // let SAVKEY = (params['SAV_KEY']);
      // this.SAVKEY = SAVKEY;
     
  
   
    this.progress=0;
   this.getCount();
    this.progresspercentage=0;
    this.APIservice.checkingSavekeyData(this.APIservice.SavKey).subscribe(
      data => this.getResponseData(data),
      () => console.log("here data in network ",JSON.stringify(this.data))
     );
    // this.getResponseData(data);
   }

  onSelectionChange(entry,questvar) {
  //this.selectedEntry.ansVar = entry.ansVar;
  console.log("selected:", entry.ansVar);
   this.postobj={};
  
    let varTotest=this.APIservice.clickedVAR(questvar);
    if( varTotest < 0)
    {
    console.log("no match:" ,varTotest);
    this.postobj['SAV_KEY']=this.APIservice.SavKey;
    this.postobj['Q_VAR']=questvar;
    this.postobj['Q_VAL']="TRUE";
    this.postobj['ANS_VAR']=entry.ansVar;
    this.postobj['ANS_VAL']="TRUE";
    this.APIservice.AddformData( this.postobj);
   // console.log( this.postobj);
    this.progress= this.progress+1;
    this.progresspercentage=Math.round((this.progress/this.QidCount)*100);
    }
    else
    {
          console.log( "match:" ,varTotest);
    }
  }

getCustData()
{ //adding temporary json filereading logic
  console.log( "we are in custdata");
  // this.APIservice.getUSERData().subscribe(data=>{
  //  this.customerArray=data.json();

   this.APIservice.getCustQuestData(1).subscribe(data=>{
    setTimeout(function(){
      this.customerArray = data;
      
    },3000);
   
    this.customerArray.map( res => {
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
      // console.log("dummy",JSON.stringify(this.dummyData));
      // console.log("print",JSON.stringify(this.PrintJsonQuest));
      // 

    })
   
  })
  
}

getCustData1()
{ //adding temporary json filereading logic

  // this.APIservice.getUSERData().subscribe(data=>{
  //  this.customerArray=data.json();

  this.APIservice.getCustQuestData(1).subscribe(data=>{
    this.customerArray = data;
      
    this.customerArray.map( res => {
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
     // console.log("dummy",JSON.stringify(this.dummyData));
     // console.log("print",JSON.stringify(this.PrintJsonQuest));
      // 

    })
   
  })
  
}

processData()
{
  this.getCustData()
}



GetValue(abc){
  return "BQ_VAR1";
}
getCount()
{ 
  this.APIservice.getData().subscribe(response=>{
  this.tabsArray=response.json();
  for (let i = 0; i < this.tabsArray.length; i++) {
    //console.log( this.tabsArray[i].content);
    for(let j = 0; j < this.tabsArray[i].content.length; j++)
    {
      this.QidCount=this.QidCount+1;
      // console.log( this.tabsArray[i].content[j].QVar);
    }

  }
 
  return this.QidCount;
  });
}

// checkingSavekeyData(savkey)

//   {    console.log("here data on network ");
         
//     var URL = "http://localhost:3000/api/cisco1ea/questionnaire/get_quest";
//     this.body = { "savkey": savkey};
    
//         this.http.post(URL, this.body).map(res => res.json())
//         .subscribe(
//           questResponse => this.questResponse = questResponse,
//           error => console.error('Error: ' + error),
//           () => console.log("here data network",JSON.stringify(this.questResponse))
//         )
  
    
//   }

 getResponseData(d)
 {
   console.log("we are in resppnse",d);
  this.APIservice.getData().subscribe(response=>{
    this.tabsArray=response.json();
    this.StaticJsonQuest = this.tabsArray;
    this.dummyData=this.StaticJsonQuest;
    console.log("service method",this.APIservice.CustKeyFlag);
   // if(this.APIservice.CustKeyFlag)
   if(this.APIservice.SavKey=="1")
    { 
      
      this.getCustData();
      console.log("we r in true response:");
      //this.PrintJsonQuest= this.dummyData;
     // console.log("we r in true response:",JSON.stringify(this.dummyData));
    }
   else
   {
    console.log("we r in false response");
   // console.log("we r in false response:",JSON.stringify(this.StaticJsonQuest));
    this.StaticJsonQuest= this.StaticJsonQuest;
  }
  })

 
 }

  getTabs(){
   
    this.APIservice.getData().map(res => res.json())
    .subscribe(
      tabsArray => this.tabsArray = tabsArray,
      error => console.error('Error: ' + error),
      () => console.log(this.tabsArray[0].content[0])
    )

  }

}
