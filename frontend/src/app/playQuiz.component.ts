import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from "@angular/router";
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { FinishedComponent } from './finished.component';

@Component({
  selector: 'playquiz',
  templateUrl: './playQuiz.component.html',
})
export class PlayQuizComponent {

	quizId : any;
	questions : any;

	constructor(public api : ApiService, private route: ActivatedRoute, private dialog : MatDialog) {}

	ngOnInit()
	{
		this.quizId = this.route.snapshot.paramMap.get("quizId");

		this.api.getQuestions(this.quizId).subscribe(res => {
			this.questions = res;

			this.questions.forEach((q : any) => {
				q.answers = [ q.correctAnswer, q.wrongAnswer1, q.wrongAnswer2, q.wrongAnswer3 ];
				shuffle(q.answers);
			});
		});
	}

	finish()
	{
		var correct = 0;

		this.questions.forEach((q : any) => {
			if (q.correctAnswer == q.selectedAnswer)
				correct++;
		});

		console.log(correct);

		this.dialog.open(FinishedComponent, {
			data: { correct, total: this.questions.length},
		});
	}

	step = 0;

	setStep(index: number)
	{
		this.step = index;
	}

	nextStep()
	{
		this.step++;
	}

	prevStep()
	{
		this.step--;
	}

}

function shuffle(a : any)
{
	for(let i = a.length; i; i--)
	{
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}