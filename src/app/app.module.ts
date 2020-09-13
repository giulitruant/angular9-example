import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleModule } from './modules/articles/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { LoginComponent } from './login/login.component';
// import { LoginComponent } from './home/modules/comment/home/home/comment.component';
// import { ArticleHomeComponent } from './article-home/article-home.component';
// import { AddArticleComponent } from './add-article/add-article.component';
// import { EditArticleComponent } from './edit-article/edit-article.component';
// import { EditCommentComponent } from './edit-comment/edit-comment.component';
// import { AddCommentComponent } from './add-comment/add-comment.component';
// import { HomeCommentComponent } from './home-comment/home-comment.component';
// import { HomeArticleComponent } from './home-article/home-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // ArticleHomeComponent,
    // AddArticleComponent,
    // EditArticleComponent,
    // EditCommentComponent,
    // AddCommentComponent,
    // HomeCommentComponent,
    // HomeArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ArticleModule,
    CommentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
