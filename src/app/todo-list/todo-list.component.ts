import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { TodoItem, TodoItemComponent } from '../model/todo-item';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() list: any[];
  @Output() itemRemoved = new EventEmitter();
  @Output() itemStateChanged = new EventEmitter();
  @Output() itemEdit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  removeItem(id) {
    this.itemRemoved.emit(id);
  }

  completeTask(item: TodoItemComponent) {
    this.itemStateChanged.emit(item);

  }

  editTask(item: TodoItemComponent){
    this.itemEdit.emit(item);
    
  }

}