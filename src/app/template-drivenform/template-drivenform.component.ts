import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { User } from './user'


import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-template-drivenform',
  templateUrl: './template-drivenform.component.html',
  styleUrls: ['./template-drivenform.component.css']
})
export class TemplateDrivenformComponent  {

  isValidFormSubmitted = false;
	user = new User();
	constructor(private userService: UserServiceService) {
	}
	onFormSubmit(form: NgForm) {
	   this.isValidFormSubmitted = false;
	   if(form.invalid){
		  return;	
	   } 	
	   this.isValidFormSubmitted = true;
	   this.user.userName = form.controls['uname'].value;
	   this.user.gender = form.controls['gender'].value;
	   this.user.isMarried = form.controls['married'].value;
	   this.user.isTCAccepted = form.controls['tc'].value;
	   this.userService.createUser(this.user);
	   this.resetForm(form);
	}
	resetForm(form: NgForm) {
	   this.user = new User();	
	   form.resetForm({
		   married: false
	   }); 
	}
	setDefaultValues() {
	   this.user.userName = 'Krishna';
	   this.user.gender = 'male';
	   this.user.isMarried = true;
	   this.user.isTCAccepted = false;
	}
} 
