import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TodoItem } from './model/todo-item';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  list = [];
  lastItemId = 0;

  constructor(private storage: LocalStorageService) { }

  add(task: TodoItem) {
    debugger;
    const itemEdit = this.list.find((element) => element.id === task.id) as TodoItem;

    if (itemEdit === undefined) {
      task.id = this.lastItemId;
      this.list.push(task);
      this.lastItemId += 1;

    } else {
      task.id = itemEdit.id;
      const index = this.list.findIndex((item) => item.id === task.id);
      this.list.splice(index);

      this.list.push(task);
    }
  }

  remove(id: any) {
    debugger;
    const index = this.list.findIndex((element) => element.id === id);
    this.list.splice(index, 1);

  }

  incompletedSize() {
    return this.list.filter(item => !item.isCompleted).length;

  }

  completedSize() {
    return this.list.filter(item => item.isCompleted).length;
  }

  getName() {
    return 'TodoService 123' + this.storage.getName();
  }

  guardar(){
    this.storage.save(this.list);

  }

}
