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
