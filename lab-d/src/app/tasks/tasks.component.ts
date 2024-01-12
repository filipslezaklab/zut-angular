import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CreateTaskRequest, Task } from 'src/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./tasks.component.html",
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  loading: boolean = false;

  newTaskForm = new FormGroup({
    title: new FormControl(''),
    deadline: new FormControl(new Date()),
  });

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.index().subscribe((resp) => {
      this.tasks = resp;
    });
  }

  complete(task: Task, event?: Event,): void {
    event?.preventDefault();
    this.taskService.patch({
      id: task.id,
      task: {
        ...task,
        completed: !task.completed
      }
    }).subscribe(() => this.getTasks());
  }

  handleNewTaskSubmit() {
    const { deadline, title } = this.newTaskForm.value;
    if (deadline && title) {
      const requestData: CreateTaskRequest = {
        title,
        deadline,
        archived: false,
        completed: false,
      };
      this.taskService.post(requestData).subscribe(() => {
        this.newTaskForm.reset({
          deadline: new Date(),
          title: '',
        });
        this.getTasks();
        this.loading = false;
      })
    }
  }

  archive() {
    const tasks = this.tasks.filter((t) => t.completed && !t.archived).map((t) => {
      t.archived = true;
      return t;
    });
    if (!tasks.length) return;
    this.loading = true;
    const updates = tasks.map(t => this.taskService.patch({ id: t.id, task: t }));
    forkJoin(updates).subscribe(() => {
      this.loading = false;
      this.getTasks();
    });
  }

}
