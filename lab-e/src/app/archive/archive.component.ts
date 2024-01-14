import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from 'src/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatIconModule,
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
