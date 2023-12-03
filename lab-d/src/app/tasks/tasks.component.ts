import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: "./tasks.component.html",
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.index().subscribe((resp) => {
      this.tasks = resp;
    })
  }

 }
