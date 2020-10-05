import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppConfigService } from './core/http/app-config.service';
import { HeaderComponent } from './modules/header/header.component';
import { HomeComponent } from './home/home.component';
//import { ArticleModule } from './modules/articles/article.module';
import { HomeArticleComponent } from './modules/articles/pages/home-article/home-article.component';
import { AddArticleComponent } from './modules/articles/pages/add-article/add-article.component';
import { EditArticleComponent } from './modules/articles/pages/edit-article/edit-article.component';


const appInitializerFn = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddArticleComponent,
    EditArticleComponent,
    // EditCommentComponent,
    // AddCommentComponent,
    // HomeCommentComponent,
    HomeArticleComponent,
    // HeaderComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    //ArticleModule
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
