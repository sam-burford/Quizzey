import { Component } from "@angular/core";
import { ApiService } from "./api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	templateUrl: "./question.component.html", 
	selector: "question"
})

export class QuestionComponent {

	question : any = {};
	quizId : any = undefined;

	// We are using the constructor to have the ApiService injected into the component. 
	constructor(private api : ApiService, private route: ActivatedRoute) {}

	ngOnInit()
	{
		this.quizId = this.route.snapshot.paramMap.get("quizId");
		this.api.questionSelected.subscribe(q => this.question = q);
	}

	post(question : any)
	{
		question.quizId = this.quizId;
		this.api.postQuestion(question);
	}

	put(question : any)
	{
		this.api.putQuestion(question);
	}

}