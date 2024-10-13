import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { Injectable, Injector } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  private employeeService!: EmployeeService;

  /*constructor(private employeeService: EmployeeService) {}*/
  constructor(private injector: Injector) {
    // Inject OtherService lazily
    setTimeout(() => {
      this.employeeService = this.injector.get(EmployeeService);
      this.getEmployeeData();
    });
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((employee) => employee.id !== id);
    });
  }

  private getEmployeeData(): void {
    if (this.employeeService != null) {
      this.employeeService.getEmployees().subscribe((data: Employee[]) => {
        this.employees = data;
      });
    }
  }
}
