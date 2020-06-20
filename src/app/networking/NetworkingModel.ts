export class QuestionairModel {
    id: string;
    tabTitle: string;
    content: Content[];
  }


  
  export class Content {
    QVar: number;
    QText: string;
    Answer: Answer[];
    type: string;
  }
  
  export class Answer {
    ansVar: string;
    ansText: string;
    ansVal: string;
  }