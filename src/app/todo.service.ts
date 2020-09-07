import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TodoItem, TodoItemComponent } from './model/todo-item';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  list = [];
  lastItemId = 0;

  constructor(private storage: LocalStorageService) { }

  add(task: any) {
    debugger;
    this.lastItemId = this.lastItemId !== undefined? this.lastItemId: 1;
    task.id = this.lastItemId;
    // task.setValue({
    //   id: this.lastItemId
    // });

    this.list.push(task);
    this.lastItemId += 1;
  }

  remove(group: FormGroup) {
    debugger;
    const index = this.list.findIndex((element) => element.id === group.get('id').value);
    this.list.splice(index, 1);

  }

  incompletedSize() {
    return this.list.filter(item => !item.isCompleted).length;

  }

  completedSize() {
    return  this.list.filter(item => item.isCompleted).length ;
  }

  getName() {
    return 'TodoService 123' + this.storage.getName();
  }
}
