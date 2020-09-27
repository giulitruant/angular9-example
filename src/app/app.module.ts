import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeArticleComponent } from './modules/articles/pages/home-article/home-article.component';
import { AddArticleComponent } from './modules/articles/pages/add-article/add-article.component';
import { EditArticleComponent } from './modules/articles/pages/edit-article/edit-article.component';
import { EditCommentComponent } from './modules/comment/pages/edit-comment/edit-comment.component';
import { AddCommentComponent } from './modules/comment/pages/add-comment/add-comment.component';
import { HomeCommentComponent } from './modules/comment/pages/home-comment/home-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddArticleComponent,
    EditArticleComponent,
    EditCommentComponent,
    AddCommentComponent,
    HomeCommentComponent,
    HomeArticleComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
