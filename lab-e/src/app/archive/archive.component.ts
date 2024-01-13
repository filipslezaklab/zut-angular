import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    CommonModule,
  ],
  styleUrls: ['./archive.component.scss'],
  templateUrl: './archive.component.html',
})
export class ArchiveComponent implements OnInit {

  public loading = false;

  tasks: Task[] = [];

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.index(true).subscribe((res) => {
      this.tasks = res;
    });
  }

  public delete(task: Task, event: Event): void {
    event.preventDefault();
    this.tasksService.delete(task).subscribe((res) => {
      this.getTasks();
    });
  }
}
