import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { TodoItem } from '../model/todo-item';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() list: [];
  @Output() itemRemoved = new EventEmitter();
  @Output() itemStateChanged = new EventEmitter();
  @Output() itemEdit = new EventEmitter();
  item: TodoItem;
  constructor() { }   
  
  removeItem(id) {
    this.itemRemoved.emit(id);
  }

  completeTask(item: TodoItem) {
    this.itemStateChanged.emit(item);

  }

  editTask(item: TodoItem){
    debugger;
    this.itemEdit.emit(item);
  } 

}
