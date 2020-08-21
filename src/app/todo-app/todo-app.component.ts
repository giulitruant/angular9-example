import { Component, OnInit } from '@angular/core';
import {TodoItem, TodoItemComponent} from '../model/todo-item';
import { element } from 'protractor';
import { TodoService } from '../todo.service';
/** */
@Component({
  selector: 'app-todo',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent  {

  constructor(
    private service: TodoService
  ) {  }

  getList() {
    return this.service.list;

  }

  onTodoItemRemoved(id) {
    this.service.remove(id);

  }

  onItemStateChanged(item: TodoItemComponent) {    
    item.todoItemForm.patchValue({
      isCompleted: !(item.todoItemForm.get('isCompleted'))
    });
    
  }

  onItemEdit(){
    
  }

  onTodoItemCreated(task) {    
    this.service.add(task);

  }

}
