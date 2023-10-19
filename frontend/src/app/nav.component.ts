import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav', 
  template: `
	<mat-toolbar style="gap: 6px;">
		<button mat-stroked-button routerLink="/">My Quizzes</button>
		<button mat-stroked-button routerLink="/play">Play</button>
		<span style="flex: 1 1 auto;"></span>
		<button mat-stroked-button *ngIf="!auth.isAuthenticated" routerLink="/register">Register</button>
		<button mat-stroked-button *ngIf="!auth.isAuthenticated" routerLink="/login">Login</button>
		<button mat-stroked-button *ngIf="auth.isAuthenticated" (click)="auth.logout()">Logout</button>
	</mat-toolbar>
  `
})
export class NavComponent {

	constructor(public auth: AuthService) {}

}
