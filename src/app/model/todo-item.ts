import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export class TodoItem {
  id: number;
  description: string;
  isCompleted: boolean = false;
  url: string;

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}

export class TodoItemComponent {
  itemForm = this.fb.group({
    id: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    isCompleted: new FormControl(''),
    url: new FormControl('', [Validators.required])
  });

  constructor(private fb: FormBuilder) { }
}
