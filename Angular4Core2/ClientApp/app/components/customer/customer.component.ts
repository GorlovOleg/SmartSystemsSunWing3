import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/index';
import { CustomerService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class CustomerInfo implements Customer {
    constructor(public customerId?, public firstName?, public lastName?, public gender?, public phone?, public email?, public birthday?) { }
}

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;

    newCustomer: boolean;
    customer: Customer = new CustomerInfo();
    customers: Customer[];
    public editCustomerId: any;
    public fullname: string;

    constructor(private customerService: CustomerService, private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.editCustomerId = 0;
        this.loadData();
    }

    loadData() {
        this.customerService.getCustomers()
            .subscribe(res => {
                this.rowData = res.result;
            });
    }

    showDialogToAdd() {
        this.newCustomer = true;
        this.editCustomerId = 0;
        this.customer = new CustomerInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(customer: Customer) {
        this.newCustomer = false;
        this.customer = new CustomerInfo();
        this.customer.customerId = customer.customerId;
        this.customer.firstName = customer.firstName;
        this.customer.lastName = customer.lastName;
        this.customer.gender = customer.gender;
        this.customer.phone = customer.phone;
        this.customer.email = customer.email;
        this.customer.birthday = customer.birthday;
        this.displayDialog = true;
    }

    onRowSelect(event) {
    }

    save() {
        this.customerService.saveCustomer(this.customer)
            .subscribe(response => {
                this.customer.customerId > 0 ? this.toastrService.success('Data updated Successfully') :
                    this.toastrService.success('Data inserted Successfully');
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.customer = new CustomerInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(customer: Customer) {
        this.fullname = customer.firstName + ' ' + customer.lastName;
        this.editCustomerId = customer.customerId;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.customerService.deleteCustomer(this.editCustomerId)
                .subscribe(response => {
                    this.editCustomerId = 0;
                    this.loadData();
                });
            this.toastrService.error('Data Deleted Successfully');
        }
        this.displayDeleteDialog = false;
    }
}