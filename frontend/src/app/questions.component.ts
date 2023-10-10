import { Component } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
	templateUrl: "./questions.component.html", 
	selector: "questions"
})

export class QuestionsComponent {

	questions : any = [];

	constructor(private api : ApiService) {}

	ngOnInit()
	{
		this.api.getQuestions().subscribe(res => {
			this.questions = res;
		});
	}

}