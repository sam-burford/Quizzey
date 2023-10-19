import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

	constructor(private http: HttpClient, private router: Router) {}

	get isAuthenticated() : boolean
	{
		return !!localStorage.getItem("token");
	}

	register(credentials : any)
	{
		this.http.post<any>(`https://localhost:7128/api/account`, credentials).subscribe(res => {
			this.authenticate(res);
		});
	}

	login(credentials : any)
	{
		this.http.post<any>(`https://localhost:7128/api/account/login`, credentials).subscribe(res => {
			this.authenticate(res);
		});
	}

	authenticate(res : any)
	{
		localStorage.setItem("token", res.token);

		this.router.navigate(['/']);
	}

	logout()
	{
		localStorage.removeItem("token");
	}

}