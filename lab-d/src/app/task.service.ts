import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskRequest, Task } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public index(archived = false): Observable<Task[]> {
    return this.http.get<Task[]>('', {
      params: {
        archived,
      },
    });
  }

  public post(data: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>('', {
      data,
    });
  }

  public put(data: Task): Observable<Task> {
    return this.http.put<Task>(`${data.id}`, { data });
  }

  public delete(task: Task): Observable<void> {
    return this.http.delete<void>(`${task.id}`);
  }
}
