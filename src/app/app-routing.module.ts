import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { HomeArticleComponent } from './modules/articles/pages/home-article/home-article.component';
import { EditArticleComponent } from './modules/articles/pages/edit-article/edit-article.component';
import { AddArticleComponent } from './modules/articles/pages/add-article/add-article.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'article',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'home', component:  HomeArticleComponent, pathMatch: 'full'},
          { path: 'edit/:id', component:  EditArticleComponent, pathMatch: 'full'},
          { path: 'edit/:id', component:  AddArticleComponent, pathMatch: 'full'}
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
