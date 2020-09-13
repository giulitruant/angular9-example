// import { AbmComponent } from 'pages/abm';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HomeCommentComponent } from './pages/home-comment/home-comment.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';


const routes: Routes = [
  {
    path: 'comment',
    canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class CommentRoutingModule {}
