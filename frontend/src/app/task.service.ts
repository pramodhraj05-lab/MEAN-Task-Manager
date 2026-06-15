import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, ApiResponse } from './task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  // Get all tasks (optional filters)
  getTasks(filters?: { status?: string; priority?: string }): Observable<ApiResponse<Task[]>> {
    let params = new HttpParams();
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.priority) params = params.set('priority', filters.priority);
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl, { params });
  }

  // Get a single task
  getTask(id: string): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`);
  }

  // Create a new task
  createTask(task: Task): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(this.apiUrl, task);
  }

  // Update a task
  updateTask(id: string, task: Partial<Task>): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, task);
  }

  // Delete a task
  deleteTask(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
