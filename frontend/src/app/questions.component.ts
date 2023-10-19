import { Component } from "@angular/core";
import { ApiService } from "./api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	templateUrl: "./questions.component.html", 
	selector: "questions"
})

export class QuestionsComponent {

	questions : any = [];
	quizId : any = undefined;

	constructor(public api : ApiService, private route : ActivatedRoute) {}

	ngOnInit()
	{
		this.quizId = this.route.snapshot.paramMap.get("quizId");

		this.api.getQuestions(this.quizId).subscribe(res => {
			this.questions = res;
		});
	}

}