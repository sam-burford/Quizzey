import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { QuestionComponent } from './question.component';
import { QuizComponent } from './quiz.component';
import { QuizesComponent } from './quizes.component';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './questions.component';
import { NavComponent } from './nav.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { PlayComponent } from './play.component';
import { PlayQuizComponent } from './playQuiz.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { FinishedComponent } from './finished.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes = [
  { path: "", component: HomeComponent }, 
  { path: "question", component: QuestionComponent }, 
  { path: "question/:quizId", component: QuestionComponent }, 
  { path: "questions", component: QuestionsComponent }, 
  { path: "quiz", component: QuizComponent }, 
  { path: "quizes", component: QuizesComponent }, 
  { path: "register", component: RegisterComponent }, 
  { path: "login", component: LoginComponent }, 
  { path: "play", component: PlayComponent }, 
  { path: "playQuiz/:quizId", component: PlayQuizComponent }, 
];

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    QuestionComponent, 
    QuestionsComponent, 
    QuizComponent, 
    QuizesComponent, 
    NavComponent, 
    RegisterComponent, 
    LoginComponent, 
    PlayComponent, 
    PlayQuizComponent, 
    FinishedComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
    FormsModule, 
    MatListModule, 
    MatToolbarModule, 
    ReactiveFormsModule, 
    MatExpansionModule, 
    MatRadioModule, 
    MatDialogModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
