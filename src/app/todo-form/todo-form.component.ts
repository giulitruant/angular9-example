import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TodoItem, TodoItemComponent } from '../model/todo-item';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  
  @Output() add = new EventEmitter();  
  @Input() edit = new EventEmitter();
  todoItemForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    url: new FormControl('', [Validators.required, urlValidator]),
  });

  constructor(){
    //this.todoItemForm.valueChanges.subscribe(value => console.log(value));

  }

  onSubmit() {
    this.add.emit(this.todoItemForm.value);

  }

  initialize() {
    this.todoItemForm.reset();

  }
}

export function urlValidator(control: AbstractControl) {
  if (!control.value.startsWith('http') || !control.value.includes('.com')) {
    return { startsWithA: true };
  }
  return null;

}