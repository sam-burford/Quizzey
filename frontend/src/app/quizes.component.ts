import { Component } from "@angular/core";
import { ApiService } from "./api.service";

@Component({
	templateUrl: "./quizes.component.html", 
	selector: "quizes"
})

export class QuizesComponent {

	quizes : any = [];

	constructor(public api : ApiService) {}

	ngOnInit()
	{
		this.api.getQuizzes().subscribe(res => {
			this.quizes = res;
		});
	}

}