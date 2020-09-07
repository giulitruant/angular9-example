import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { TodoItem, TodoItemComponent } from '../model/todo-item';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() itemRemoved = new EventEmitter();
  @Output() itemStateChanged = new EventEmitter();
  @Output() itemEdit = new EventEmitter();
  item: TodoItem;
  constructor() { }

  ngOnInit() {
  }
  removeItem(id) {
    this.itemRemoved.emit(id);
  }

  completeTask(item: TodoItemComponent) {
    this.itemStateChanged.emit(item);

  }

  editTask(item: TodoItem){
    debugger;
    this.item = item;
    //this.itemEdit.emit(item);

  }

  getItem(){
    return this.item;
  }

  ItemFormA(): FormArray {
    debugger;
    return this.form.get('itemArray') as FormArray;

  }

}
