import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRoutingModule } from './comment-routing.module';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { HomeCommentComponent } from './pages/home-comment/home-comment.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';



@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule
  ],
  declarations: [
    HomeCommentComponent,
    AddCommentComponent,
    EditCommentComponent
  ],
})
export class CommentModule {
}
