import { Component, OnInit } from '@angular/core';
import { Chart, registerables, Colors } from 'chart.js';
import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.css',
})

export class EmployeeChartComponent implements OnInit {
  subscription: Subscription = new Subscription();
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.subscription = this.employeeService.employees.subscribe(
      (employees) => {
        this.renderChart(this.formatChartData(employees))
      }
    );
  }

  formatChartData(employees: Employee[]): {label: string, data: number}[] {
    return employees.map(employee => ({label: employee.name, data: employee.percentage ?? 0}))
  }

  renderChart(chartData: {label: string, data: number}[]) {
    const ctx = document.getElementById('piechart') as HTMLCanvasElement;
    Chart.register(...registerables, Colors);
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.map(item => item.label),
        datasets: [
          {
            label: '%',
            data: chartData.map(item => item.data),
          },
        ],
      },
    });
  }
}
