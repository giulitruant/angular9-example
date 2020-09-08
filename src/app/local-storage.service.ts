import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

  list = [];

  constructor() { }
  getName() {
    return 'LocalStorageService'
  }

  getList(){
    this.list = JSON.parse(localStorage.getItem('tareas'));
    return this.list;
  }

  save(list: any){
    localStorage.setItem('tareas', JSON.stringify(list));
  }

  limpiar(){
    localStorage.clear();
  }
}
