import { Component, EventEmitter, Output, ViewChild, AfterViewChecked, AfterViewInit, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkingComponent } from '../networking/networking.component';
import {Router, ActivatedRoute, Params, NavigationCancel, NavigationEnd} from '@angular/router';
import { URLSearchParams, } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SecurityComponent } from '../security/security.component';
import { QuestionnairApiService } from '../service/questionnair-api.service';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent 
{
  @ViewChild(NetworkingComponent) child: NetworkingComponent;
  @ViewChild(SecurityComponent) SecurityChild: SecurityComponent;
  @Output() addEvent: EventEmitter<any>=new EventEmitter();
  constructor(public router: Router,public http:Http,public APIservice:QuestionnairApiService,private activatedRoute: ActivatedRoute){ 
  
   }
  tabsArray=[];
  model:any={};
  custKey:string;
  SAVKEY:any;
  body:any;
  questResponse=[];

  ngOnInit() {
    
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.activatedRoute.queryParams.subscribe(params => { 
         // console.log(params);
           let SavKey=this.activatedRoute.snapshot.queryParamMap.get("SAV_KEY");
           let SavName=this.activatedRoute.snapshot.queryParamMap.get("SAV_NAME");
         
           this.APIservice.SavKey=SavKey;
           console.log("displaying query key ttt:",this.APIservice.SavKey);
           this.APIservice.SavName=SavName;
           this.APIservice.checkingSavekeyData(this.APIservice.SavKey);
            // this.APIservice.checkingSavekeyData(this.APIservice.SavKey).subscribe(
            // data => this.getResponseData(data),
          
         
        });

      }
  }); 
  
  
  }


 
  

  
Save()
{
//this.child.onFormSubmit(event, this.model);
this.child.testevent();
//this.SecurityChild.securityEvent();
}
 
checkingSavekeyData1(savkey)

{    
       
  var URL = "http://localhost:3000/api/cisco1ea/questionnaire/get_quest";
  this.body = { "savkey": savkey};
  // this.model = this.http.post(URL, this.body).map(res=> res.json());
  // // // this.localVar = this.http.get(path).map(res => res.json());
  // this.APIservice.getCustQuestData(savkey).subscribe(data=>{
  //   this.questResponse = data;
  //   {

      this.http.post(URL, this.body).map(res => res.json())
      .subscribe(
        questResponse => this.questResponse = questResponse,
        error => console.error('Error: ' + error),
        () => console.log("here data ",JSON.stringify(this.questResponse))
      )

  //   if(  this.questResponse.length)
  //   {
  //     this.APIservice.setCustKeyFlag(true);
  //    // this.APIservice.CustKeyFlag=true
  //    console.log("question page method",this.APIservice.CustKeyFlag);
  //     console.log("data is there",this.questResponse.length);
  //   }
  //   else{
  //     this.APIservice.CustKeyFlag=true;
  //     console.log("data is not there",this.questResponse.length);
  //   }
  // }
  // });
}
 

     
}






