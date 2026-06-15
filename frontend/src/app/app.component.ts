import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showForm = false;
  isEditing = false;

  // Form model
  newTask: Task = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  };

  filterStatus = '';
  filterPriority = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    const filters: any = {};
    if (this.filterStatus) filters.status = this.filterStatus;
    if (this.filterPriority) filters.priority = this.filterPriority;

    this.taskService.getTasks(filters).subscribe({
      next: (res) => {
        this.tasks = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks. Is the backend running?';
        this.isLoading = false;
      }
    });
  }

  openAddForm(): void {
    this.isEditing = false;
    this.newTask = { title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' };
    this.showForm = true;
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.newTask = { ...task };
    this.showForm = true;
  }

  saveTask(): void {
    if (!this.newTask.title.trim()) return;

    if (this.isEditing && this.newTask._id) {
      this.taskService.updateTask(this.newTask._id, this.newTask).subscribe({
        next: () => {
          this.showSuccess('Task updated!');
          this.showForm = false;
          this.loadTasks();
        },
        error: () => { this.errorMessage = 'Failed to update task.'; }
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.showSuccess('Task created!');
          this.showForm = false;
          this.loadTasks();
        },
        error: () => { this.errorMessage = 'Failed to create task.'; }
      });
    }
  }

  deleteTask(id: string): void {
    if (!confirm('Delete this task?')) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.showSuccess('Task deleted.');
        this.loadTasks();
      },
      error: () => { this.errorMessage = 'Failed to delete task.'; }
    });
  }

  toggleStatus(task: Task): void {
    const nextStatus: { [key: string]: Task['status'] } = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    };
    this.taskService.updateTask(task._id!, { status: nextStatus[task.status] }).subscribe({
      next: () => this.loadTasks(),
      error: () => { this.errorMessage = 'Failed to update status.'; }
    });
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  cancelForm(): void {
    this.showForm = false;
    this.errorMessage = '';
  }

  getPriorityClass(priority: string): string {
    return { 'high': 'badge-high', 'medium': 'badge-medium', 'low': 'badge-low' }[priority] || '';
  }

  getStatusClass(status: string): string {
    return { 'completed': 'status-done', 'in-progress': 'status-progress', 'pending': 'status-pending' }[status] || '';
  }
}
