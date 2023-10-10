import { Component } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
	templateUrl: "./question.component.html", 
	selector: "question"
})

export class QuestionComponent {

	question : any = {};

	// We are using the constructor to have the ApiService injected into the component. 
	constructor(private api : ApiService) {}

	post(question : string)
	{
		this.api.postQuestion(question);
	}

}