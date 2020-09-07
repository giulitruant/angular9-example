import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../model/todo-item';
import { TodoService } from '../todo.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
/** */
@Component({
  selector: 'app-todo',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent implements OnInit {

  item: TodoItem = null;
  formItem: FormGroup;
  itemArray: FormArray;

  constructor(
    private service: TodoService,
    private fb: FormBuilder
  ) {  }

  ngOnInit(){
    this.formItem = this.fb.group({
      itemArray: this.fb.array([])
    });
    debugger;
    this.getList();

  }

  getList() {
    return this.service.list;
  
  }

  onTodoItemRemoved(id: any) {
    this.service.remove(id);

  }

  onItemStateChanged(item: TodoItem) {
    item.toggleCompleted();    

  }

  onItemEdit(item: TodoItem){
    debugger;
    this.item = item;

  }

  onTodoItemCreated(task: TodoItem) {    
    this.service.add(task);

  } 

}
