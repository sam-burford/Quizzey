import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler)
	{
		var token = localStorage.getItem('token');

		var authRequest = req.clone({
			headers: req.headers.set("Authorization", `Bearer ${token}`)
		});

		return next.handle(authRequest);
	}

}