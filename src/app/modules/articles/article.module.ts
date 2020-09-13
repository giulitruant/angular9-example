import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { HomeArticleComponent } from './pages/home-article/home-article.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';




@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule
  ],
  declarations: [
    HomeArticleComponent,
    AddArticleComponent,
    EditArticleComponent
  ],
})
export class ArticleModule {
}
