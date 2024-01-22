import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { forkJoin } from 'rxjs';
import { CreateTaskRequest, Task } from 'src/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  loading: boolean = false;

  newTaskForm: FormGroup;

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.newTaskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      deadline: null,
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.index().subscribe((resp) => {
      this.tasks = resp;
    });
  }

  complete(task: Task, event?: Event): void {
    event?.preventDefault();
    this.taskService
      .patch({
        id: task.id,
        task: {
          ...task,
          completed: !task.completed,
        },
      })
      .subscribe(() => this.getTasks());
  }

  canArchive() {
    return (
      !this.loading &&
      this.tasks.find((t) => t.completed && !t.archived) !== undefined
    );
  }

  handleNewTaskSubmit() {
    const { deadline, title } = this.newTaskForm.value;
    if (title) {
      const requestData: CreateTaskRequest = {
        title,
        deadline,
        archived: false,
        completed: false,
      };
      this.taskService.post(requestData).subscribe(() => {
        this.newTaskForm.reset({
          deadline: null,
          title: '',
        });
        this.getTasks();
        this.loading = false;
      });
    }
  }

  archive() {
    const tasks = this.tasks
      .filter((t) => t.completed && !t.archived)
      .map((t) => {
        t.archived = true;
        return t;
      });
    if (!tasks.length) return;
    this.loading = true;
    const updates = tasks.map((t) =>
      this.taskService.patch({ id: t.id, task: t })
    );
    forkJoin(updates).subscribe(() => {
      this.loading = false;
      this.getTasks();
    });
  }
}
