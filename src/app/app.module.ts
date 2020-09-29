import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

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
import { AppConfigService } from './core/http/app-config.service';
import { HeaderComponent } from './header/header.component';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

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
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfigService]
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
