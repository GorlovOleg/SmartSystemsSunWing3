import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Customer } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class CustomerService {

    private _getCustomersUrl = "/Customer/GetCustomers";
    public _saveUrl: string = '/Customer/SaveCustomer/';
    public _updateUrl: string = '/Customer/UpdateCustomer/';
    public _deleteByIdUrl: string = '/Customer/DeleteCustomerByID/';

    constructor(private http: Http) { }

    getCustomers() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getCustomersUrl = this._getCustomersUrl;
        return this.http.get(getCustomersUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //Post
    saveCustomer(customer: Customer): Observable<string> {
        let body = JSON.stringify(customer);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options)
            .map(res => res.json().message)
            .catch(this.handleError);
    }

    //Delete
    deleteCustomer(id: number): Observable<string> {
        //debugger
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id

        return this.http.delete(deleteByIdUrl)
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }


}