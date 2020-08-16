import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import{ Task } from '.././interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = 'https://jsonplaceholder.typicode.com';
  constructor(
    private http: HttpClient /**Inyectamos el modulo */
  ) { }

  getAllTasks(){
    const path = `${this.api}/todos/`;
    return this.http.get<Task[]>(path);
  }

  getTask(id: number) {
    //Para recibir un parametro, es necesario, colocar el signo de dolar y en llaves colocar el nombre del parametro
    /* const path = `https://jsonplaceholder.typicode.com/todos/${id}`; 
    de esta manera no es necesario estar recibiendo y/o cambiando la ruta*/
    const path = `${this.api}/todos/${id}`;
    return this.http.get<Task>(path);
  }

  updateTask(task: Task) {
    const path = `${this.api}/todos/${task.id}`;
    return this.http.put<Task>(path, task);
  }

  deleteTask(id:number){
    const path = `${this.api}/todos/${id}`;
    return this.http.delete<Task>(path);
  }

  createTask(task:Task){
    const path = `${this.api}/todos/`;
    return this.http.post<Task>(path,task);
  }

}
