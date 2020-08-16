import { Component } from '@angular/core';
import{ TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Consuming-REST-API';
  constructor(
    private taskService: TaskService
  ){}

  getAllTasks(){
    this.taskService.getAllTasks()
    .subscribe(todos=>{
     console.log(todos);
    })
  }

  getTask(){
    this.taskService.getTask(1)
    .subscribe(todos=>{
      console.log(todos);
    })
  }

  deleteTask(){
    this.taskService.deleteTask(1)
    .subscribe(todos=>{
      console.log(todos);
    })
  }

  updateTask() {
    const task = {
      id: 1,
      userId: 1,
      title: "Ending consuming rest api",
      completed: true
    };

    this.taskService.updateTask(task)
    .subscribe(todos => {
      console.log(todos);
    })
  }

  createTask(){
    const task = {
      id: 201,
      userId: 201,
      title: "Finally, this work is going to github",
      completed: true
    };
    this.taskService.createTask(task)
    .subscribe(todos => {
      console.log(todos);
    })
  }

}
