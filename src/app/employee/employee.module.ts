import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeMainComponent } from './employee-main/employee-main.component';
import { EmployeeService } from './service/employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeMainComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [EmployeeMainComponent],
  providers: [EmployeeService]
})
export class EmployeeModule { }
