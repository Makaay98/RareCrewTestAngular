import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDTO } from './DTO/employee';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'platform',
})
export class EmployeeService {
  baseUrl: string = 'https://rc-vault-fap-live-1.azurewebsites.net/';
  apiCode: string = 'vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  employees = new Subject<Employee[]>;

  constructor(private client: HttpClient) {}

  initializeEmployees() {
    this.getEmployees().subscribe((data) => {
      this.employees.next(this.getMappedAndCalculatedEmployees(data))
    });
  }

  private getEmployees(): Observable<EmployeeDTO[]> {
    return this.client.get<EmployeeDTO[]>(
      this.baseUrl + 'api/gettimeentries?code=' + this.apiCode
    );
  }

  private getMappedAndCalculatedEmployees(
    employees: EmployeeDTO[]
  ): Employee[] {
    const employeeDictionary: { [key: string]: number } = {};

    for (const employee of employees) {
      const { EmployeeName, StarTimeUtc, EndTimeUtc } = employee;

      const totalHours = this.calculateTotalHours(StarTimeUtc, EndTimeUtc);

      if (employeeDictionary[EmployeeName ?? "N/A"]) {
        employeeDictionary[EmployeeName ?? "N/A"] += totalHours;
      } else {
        employeeDictionary[EmployeeName ?? "N/A"] = totalHours;
      }
    }

    const employeeArray: Employee[] = Object.entries(employeeDictionary).map(
      ([employeeName, totalHours]) => ({
        name: employeeName,
        workedHours: Math.round(totalHours),
      })
    );
      console.log(employeeArray)
    return employeeArray;
  }

  private calculateTotalHours(startTime?: string, endTime?: string): number {
    if(!startTime || !endTime) return 0
    const startTimestamp = new Date(startTime).getTime();
    const endTimestamp = new Date(endTime).getTime();
    const millisecondsInHour = 1000 * 60 * 60;
    return (endTimestamp - startTimestamp) / millisecondsInHour;
  }
}
