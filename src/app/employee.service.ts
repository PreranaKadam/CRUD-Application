import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employee';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: any) {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }
  getEmployeeById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
