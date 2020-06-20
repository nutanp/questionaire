import { Injectable } from '@angular/core';

@Injectable()
export class AnswersService {
networkinganswer={};
securityanswer={};
//prospectid: string;
  constructor() { }
  public setNetworkformvalue(networkinganswer) : void
  {
    this.networkinganswer=networkinganswer;
    console.log("inside service",+networkinganswer);
    
  }
  public setSecurityformvalue(securityanswer) : void
  {
    this.securityanswer=securityanswer;
    console.log("inside service",+securityanswer);
    
  }
  
  createAnswer(securityanswer) {
    console.log("inside service",+securityanswer);

  }

}
