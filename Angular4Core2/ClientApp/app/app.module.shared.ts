import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
// third party module to display toast 
import { ToastrModule } from 'toastr-ng2';
//PRIMENG - Third party module
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { CustomerService } from './_services/index';
import { EmployeeService } from './_services/index';



class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CustomerComponent,
        EmployeeComponent
    ],
    providers: [CustomerService, EmployeeService, 
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InputTextModule, DataTableModule, ButtonModule, DialogModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },

            { path: 'customer', component: CustomerComponent },
            { path: 'employee', component: EmployeeComponent },


            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
