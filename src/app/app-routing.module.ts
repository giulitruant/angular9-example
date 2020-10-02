import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeArticleComponent } from './modules/articles/pages/home-article/home-article.component';
import { AddArticleComponent } from './modules/articles/pages/add-article/add-article.component';
import { EditArticleComponent } from './modules/articles/pages/edit-article/edit-article.component';
import { HomeCommentComponent } from './modules/comment/pages/home-comment/home-comment.component';
import { AddCommentComponent } from './modules/comment/pages/add-comment/add-comment.component';
import { EditCommentComponent } from './modules/comment/pages/edit-comment/edit-comment.component';
import { HeaderComponent } from './modules/header/header.component';


const routes: Routes = [  
  {
    path: 'dashboard',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'article',
        //canActivate: [AuthGuard],
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
      },
      {
        path: 'comment',
        //canActivate: [AuthGuard],
        children: [
          {
            path: 'home', component: HomeCommentComponent, pathMatch: 'full'
          },
          {
            path: 'add', component: AddCommentComponent, pathMatch: 'full'
          },
          {
            path: 'edit/:id', component: EditCommentComponent, pathMatch: 'full'
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },  
  

];

export const appRoutingModule = RouterModule.forRoot(routes);
