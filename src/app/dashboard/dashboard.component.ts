import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todos$: Observable<Todo[]>;
  todoForm: FormGroup;

  constructor(private todoService: TodoService, private fb: FormBuilder, private routes: Router) {
    this.todoForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todos$ = this.todoService.getAllTodo();
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    this.todoService.addTodo(this.todoForm.getRawValue())
      .subscribe({
        next: (s) => {
          console.warn('success: ', s);
          this.fetchTodos();
          this.todoForm.reset();
        },
        error: (e) => {
          console.warn('error: ', e);
        }
      });
  }

  openDetail(todo: Todo) {
    this.routes.navigate([`/todo/${todo.id}`]);
  }
}
