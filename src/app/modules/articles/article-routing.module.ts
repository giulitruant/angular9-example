// import { AbmComponent } from 'pages/abm';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HomeArticleComponent } from './pages/home-article/home-article.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';


const routes: Routes = [
  {
    path: 'article',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeArticleComponent, pathMatch: 'full'
      },
      {
        path: 'add', component: AddArticleComponent, pathMatch: 'full'
      },
      {
        path: 'edit/:id', component: EditArticleComponent, pathMatch: 'full'
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class ArticleRoutingModule {}
