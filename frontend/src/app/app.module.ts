import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './questions.component';

@NgModule({
  declarations: [
    AppComponent, 
    QuestionComponent, 
    QuestionsComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
    FormsModule, 
    MatListModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
