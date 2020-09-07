import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { TodoItem } from '../model/todo-item';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges{

  @Output() add = new EventEmitter();
  @Input() itemE: TodoItem = null;
  form = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    isCompleted: new FormControl(''),
    url: new FormControl('', [Validators.required, urlValidator])
  });

  constructor(private fb: FormBuilder){ }

  ngOnChanges(){
    if(this.itemE){
      this.form.patchValue(this.itemE);
    }

  }

  onSubmit() {
    debugger;
    if(this.form.invalid){
      return;

    }    

    this.add.emit(this.form.value);
    this.initialize();

  }

  initialize() {
    this.form.reset();

  }
}

export function urlValidator(control: AbstractControl) {
  if (!control.value.startsWith('http') || !control.value.includes('.com')) {
    return { startsWithA: true };
  }
  return null;

}
