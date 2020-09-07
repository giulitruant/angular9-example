import { Component, OnInit } from '@angular/core';
import {TodoItem, TodoItemComponent} from '../model/todo-item';
import { TodoService } from '../todo.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
/** */
@Component({
  selector: 'app-todo',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent implements OnInit {

  //item: TodoItemComponent;
  formItem: FormGroup;
  itemArray: FormArray;

  constructor(
    private service: TodoService,
    private fb: FormBuilder
  ) {  }

  ngOnInit(){
    this.formItem = this.fb.group({
      itemArray: this.fb.array([])
    });
    debugger;
    this.getList();

  }

  getList() {
    this.itemArray = this.formItem.get('itemArray') as FormArray;
    this.service.list.forEach(item => {
      this.itemArray.push(this.generateForm(item));

    });

    debugger;

    return this.formItem;

  }

  generateForm(item: any): FormGroup{
    let form: TodoItemComponent;
    form.itemForm.setValue({
      id: item.id,
      description: item.description,
      url: item.url
    });

    return form.itemForm;
  }

  onTodoItemRemoved(group: FormGroup) {
    this.service.remove(group);

  }

  // onItemStateChanged(item: FormGroup) {
  //   item.patchValue({
  //     isCompleted: !(item.get('isCompleted').value)
  //   });

  // }

  onItemEdit(todoI: FormGroup){
    debugger;
    this.formItem = todoI;
  }

  onTodoItemCreated(task: FormGroup) {
    debugger;
    this.service.add(task);

  }

  getItemEdit(){
    debugger;
    return this.formItem;

  }

}
