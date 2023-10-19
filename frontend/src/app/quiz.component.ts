import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'quiz', 
  templateUrl: "./quiz.component.html"
})
export class QuizComponent {

	quiz : any = {};

	constructor(private api: ApiService) {}

	ngOnInit()
	{
		// Bind to the quizSelected event, so that whenever it is changed, 
		// the value of 'quiz' is updated accordingly. 
		this.api.quizSelected.subscribe(q => this.quiz = q);
	}

	postQuiz(quiz : any) : void
	{
		this.api.postQuiz(quiz);
	}

	updateQuiz(quiz: any) : void
	{
		this.api.putQuiz(quiz);
	}

}
