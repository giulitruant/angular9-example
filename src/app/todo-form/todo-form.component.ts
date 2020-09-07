import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TodoItem, TodoItemComponent } from '../model/todo-item';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{

  @Output() add = new EventEmitter();
  itemE: FormGroup;

  constructor(private fb: FormBuilder){ }

  ngOnInit(){
    debugger;

    this.itemE = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      isCompleted: [''],
      url: ['', Validators.required]
    });

  }

  onSubmit() {
    debugger;

    if(this.itemE.invalid){
      return;
    }

    console.dir(this.itemE.value);
    console.dir(this.itemE);

    this.add.emit(this.itemE.value);
    this.initialize();

  }

  initialize() {
    this.itemE.reset();

  }
}

export function urlValidator(control: AbstractControl) {
  if (!control.value.startsWith('http') || !control.value.includes('.com')) {
    return { startsWithA: true };
  }
  return null;

}
