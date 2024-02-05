import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeMainComponent } from './employee-main/employee-main.component';
import { EmployeeService } from './service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import 'chart.js';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [EmployeeListComponent, EmployeeMainComponent, EmployeeChartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  exports: [EmployeeMainComponent],
  providers: [EmployeeService]
})
export class EmployeeModule { }
