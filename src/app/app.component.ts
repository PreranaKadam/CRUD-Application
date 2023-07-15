import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Nodejs-Express-Mysql';
  employeeForm: FormGroup;
  employees: any[] = [];
  currentEmployee: any; 

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
      this.employeeForm.reset();
      this.getEmployees();
    });
  }

  editEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe((employee: any) => {
      this.currentEmployee = employee;
      this.employeeForm.patchValue({
        name: employee.name,
        designation: employee.designation,
        salary: employee.salary
      });
    });
  }
  
  saveEditedEmployee() {
    if (this.employeeForm.invalid || !this.currentEmployee) {
      return;
    }
  
    const updatedData = this.employeeForm.value;
  
    this.employeeService.updateEmployee(this.currentEmployee.id, updatedData).subscribe(() => {
      this.getEmployees();
  
      this.employeeForm.reset();
      this.currentEmployee = null;
    });
  }
  
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployees();
    });
  }
}
