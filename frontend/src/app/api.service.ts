import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient) {}

	getQuestions()
	{
		return this.http.get("https://localhost:7128/api/questions");
	}

	postQuestion(question : string) : void
	{
		this.http.post("https://localhost:7128/api/questions", question).subscribe(res => {
			console.log(res);
		});
	}

}