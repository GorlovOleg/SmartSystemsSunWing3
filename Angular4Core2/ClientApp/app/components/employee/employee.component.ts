import { Component, OnInit } from '@angular/core';
import { Employee } from '../../_models/index';
import { EmployeeService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class EmployeeInfo implements Employee {
    constructor(public employeeId?, public firstName?, public lastName?, public gender?, public city?, public department?, public phone?) { }
}

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;

    newEmployee: boolean;
    employee: Employee = new EmployeeInfo();
    employees: Employee[];
    public editEmployeeId: any;
    public fullname: string;

    constructor(private employeeService: EmployeeService, private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.editEmployeeId = 0;
        this.loadData();
    }

    loadData() {
        this.employeeService.getEmployees()
            .subscribe(res => {
                this.rowData = res.result;
            });
    }

    showDialogToAdd() {
        this.newEmployee = true;
        this.editEmployeeId = 0;
        this.employee = new EmployeeInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(employee: Employee) {
        this.newEmployee = false;
        this.employee = new EmployeeInfo();
        this.employee.employeeId = employee.employeeId;
        this.employee.firstName = employee.firstName;
        this.employee.lastName = employee.lastName;
        this.employee.gender = employee.gender;
        this.employee.city = employee.city;
        this.employee.department = employee.department;
        this.employee.phone = employee.phone;

        this.displayDialog = true;
    }

    onRowSelect(event) {
    }

    save() {
        this.employeeService.saveEmployee(this.employee)
            .subscribe(response => {
                this.employee.employeeId > 0 ? this.toastrService.success('Data updated Successfully') :
                    this.toastrService.success('Data inserted Successfully');
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.employee = new EmployeeInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(employee: Employee) {
        this.fullname = employee.firstName + ' ' + employee.lastName;
        this.editEmployeeId = employee.employeeId;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.employeeService.deleteEmployee(this.editEmployeeId)
                .subscribe(response => {
                    this.editEmployeeId = 0;
                    this.loadData();
                });
            this.toastrService.error('Data Deleted Successfully');
        }
        this.displayDeleteDialog = false;
    }
}