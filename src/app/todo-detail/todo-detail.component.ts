import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoService } from '../todo.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo;
  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: any) => {
        return this.todoService.getTodo(paramMap.params.id);
      })
    ).subscribe({
      next: (value) => {
        this.todo = value;
      }
    });
  }

}
