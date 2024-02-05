import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../models/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-main',
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent implements OnInit, OnDestroy { 
  employees: Employee[] = []
  subscription: Subscription = new Subscription;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.subscription = this.employeeService.employees.subscribe(employees => {
      this.employees = employees.slice().sort((a, b) => b.workedHours - a.workedHours);
    })
    this.employeeService.initializeEmployees();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
