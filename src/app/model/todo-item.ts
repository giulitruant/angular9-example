import { FormGroup, FormControl, Validators } from '@angular/forms';

export class TodoItem {
  id: number;
  description: string;
  isCompleted: boolean = false;
  url: string;

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}

export class TodoItemComponent{
  todoItemForm = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    //isCompleted: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required])
  });
}
