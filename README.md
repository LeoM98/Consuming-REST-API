# ConsumingRESTAPI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Introducción

¿Que es una apiREST?

Para dar una definición sencilla, supongamos que es similar a algo como un servicio que exponga unos endpoints y que devuelva datos en formato de json, pero el apiREST  es un protocolo para exponer estos servicios que posee ciertas reglas. Dichas reglas pueden exponer varios endpoints que significan la devolución de información de acuerdo al verbo con el que este se pida, hablando de peticiones http(get,post,put,delete)

La api que se va a consumir por decirlo de alguna manera es una fake api, no se va a consumir una base de datos o crear un archivo json porque tardaría más tiempo al tratar de llenar los archivos y otras cosas más.

JsonPlaceHolder

Es una fake api, la cual simula la operación de los endpoints, pero no guarda nada, creo que su base de datos tiene una persistencia de caché, es por esto que los cambios no son permanentes. Fake Online REST API for Testing and Prototyping (Esto es lo que es jsonPlaceHolder básicamente).

Consumiendo con Angular 
Iniciamos principalmente con crear nuestra aplicación de angular mediante ng new ‘nombre’. 

Una vez tengamos creada nuestra aplicación procedemos a crear nuestro servicio, el cual será el encargado de hacer la conección para el consumo de nuestra api y también claro está, una interfaz para describir o tipar la información que se encuentra en el jsonPlaceHolder, se hará de la siguiente manera:

ng g service services/task
ng g interface interfaces/task
En la interfaz que hemos creado tipamos los datos que vamos a recibir de nuestra apiREST

export interface Task {
  userId: string;
  id: string;
  title: string;
  completed: boolean;}
También debemos importar nuestro servicio creado en nuestro módulo y aprovechando que estamos allí también se importa el HttpClientModule para poder trabajar con nuestra clase de ts un HttpClient. Se hace de la siguiente manera:

import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [TaskService],

Archivo de service

Al pasar a nuestro archivo de services, lo que vamos a hacer será importar nuestra interface y también deberemos importar nuestro HtppClient desde Angular/common/htpp

import{ HttpClient } from '@angular/common/http';
import{ Task } from '.././interfaces/task';

Archivo de componente
Luego en nuestro componente vamos a importar nuestro servicio también, de la misma manera en la que se importó en nuestro módulo, pero esta vez se lo inyectamos al constructor así:

import{ TaskService } from './services/task.service';
constructor(
    private taskService: TaskService
  ){}

Archivo de service
constructor(
    private http: HttpClient /**Inyectamos el modulo */
  ) { }
 
  getAllTasks(){
    const path = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Task[]>(path);
  }
Como se puede observar, está el método inyectado y pues nuestra función recibe todas las tareas, por medio de la petición http y recibe un observable que tipa los datos que vienen desde el placeholder json. Ahora tendremos que suscribirnos desde nuestro componente

Suscripción en el componente
Para suscribirnos a la petición desde nuestro componente, haremos lo siguiente:
 getAllTasks(){
    this.taskService.getAllTasks()
    .subscribe(todos=>{
     console.log(todos);
    })
  }
También necesitaremos de una acción que nos obtenga esta petición, para eso crearemos un botón que nos traiga esta petición mediante un evento de clic así:
<h1>Consuming rest API</h1>
<button (click)="getAllTasks()">getAllTasks</button>

Ahora lo que sigue no es que traiga una lista, sino que sea listado de acuerdo con el id que estemos ingresando.

Nos vamos nuevamente a nuestro servicio y hacemos lo siguiente:
getTask(id: number) {
    //Para recibir un parametro, es necesario, colocar el signo de dolar y en llaves colocar el nombre del parametro
    const path = 'https://jsonplaceholder.typicode.com/todos/${id}';
    return this.http.get<Task>(path);
  }

Ahora pasamos a hacer la respectiva suscripción en nuestro componente y de paso también se llama la función en la vista.

getTask(){
    this.taskService.getTask(1)
    .subscribe(todos=>{
      console.log(todos);
    })
  }

<button (click)="getTask()">getOneTask</button>


A continuación se procederá a actualizar y a borrar una tarea de la siguiente manera

Para actualizar una tarea se pasa como parámetro la interface y se usa su propiedad de id, en cuanto a borrar por id es como si estuviéramos haciendo una búsqueda por id

updateTask(task: Task) {
    const path = `${this.api}/todos/${task.id}`;
    return this.http.put<Task>(path, task);
  }
 
  deleteTask(id:number){
    const path = `${this.api}/todos/${id}`;
    return this.http.delete<Task>(path);
  }

Para actualizar en el componente se crea una constante de tipo task y se introducen los valores que quieren o se desean cambiar, para luego pasarla por parámetro a la función que creamos en nuestro servicio.
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
 



Lo del botón es lo que se ha venido haciendo.

<button (click)="updateTask()">UpdateTask</button>
<button (click)="deleteTask()">DeleteTask</button>

La última petición que se hará es la de post

createTask(task:Task){
    const path = `${this.api}/todos/`;
    return this.http.post<Task>(path,task);
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

<button (click)="createTask()">CreateTask</button>
