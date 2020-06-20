import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule , FormGroup} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { NetworkingComponent } from './networking/networking.component';
import { SecurityComponent } from './security/security.component';
// Routes
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { TemplateDrivenformComponent } from './template-drivenform/template-drivenform.component';
import { UserServiceService } from './user-service.service';
import { AnswersService } from './answers.service';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnairApiService } from './service/questionnair-api.service';
const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'networking' },
   { path: 'questionnair',component: NetworkingComponent  },
   { path: 'networking', component: NetworkingComponent },
   { path: 'security', component: SecurityComponent }

];

export const appRouting = RouterModule.forRoot(routes);


@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    NetworkingComponent,
    SecurityComponent,
    TemplateDrivenformComponent
   
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
  
  ],
  providers: [UserServiceService,AnswersService,QuestionnairApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
