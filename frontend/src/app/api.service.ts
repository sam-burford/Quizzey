import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

@Injectable()
export class ApiService {

	private selectedQuestion = new Subject<any>();
	questionSelected = this.selectedQuestion.asObservable();

	private selectedQuiz = new Subject<any>();
	quizSelected = this.selectedQuiz.asObservable();

	constructor(private http: HttpClient) {}

	getQuestions(quizId : any)
	{
		return this.http.get(`https://localhost:7128/api/questions/${quizId}`);
	}

	postQuestion(question : any) : void
	{
		this.http.post("https://localhost:7128/api/questions", question).subscribe(res => {
			console.log(res);
		});
	}

	putQuestion(question : any) : void
	{
		this.http.put(`https://localhost:7128/api/questions/${question.id}`, question).subscribe(res => {
			console.log(res);
		});
	}

	getQuizzes()
	{
		return this.http.get("https://localhost:7128/api/quizzes");
	}

	getAllQuizzes()
	{
		return this.http.get("https://localhost:7128/api/quizzes/all");
	}

	postQuiz(quiz : any) : void
	{
		this.http.post("https://localhost:7128/api/quizzes", quiz).subscribe(res => {
			console.log(res);
		});
	}

	putQuiz(quiz : any) : void
	{
		this.http.put(`https://localhost:7128/api/quizzes/${quiz.id}`, quiz).subscribe(res => {
			console.log(res);
		});
	}

	selectQuiz(quiz : any) : void
	{
		this.selectedQuiz.next(quiz);
	}

	selectQuestion(question: any)
	{
		this.selectedQuestion.next(question);
	}

}