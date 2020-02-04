import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private BASE_URL = 'http://5e3975d9aad2220014962951.mockapi.io';
  constructor(private http: HttpClient) { }

  getAllTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.BASE_URL}/todos`)
      .pipe(map((response) => response.sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.BASE_URL}/todos`, todo);
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.BASE_URL}/todos/${id}`);
  }
}
