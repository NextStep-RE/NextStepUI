import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Customer,
  LoadCustomers,
  UpdateCustomer,
} from '../models/customer.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  loadCustomers(
    loadCustomers: LoadCustomers
  ): Observable<{ totalCount: number; customers: Customer[] }> {
    let params = new HttpParams()
      .set('pageNumber', loadCustomers.pageNumber.toString())
      .set('pageSize', loadCustomers.pageSize.toString());

    if (loadCustomers.searchInput) {
      params = params.append('search', loadCustomers.searchInput);
    }

    if (loadCustomers.sortCriteria && loadCustomers.sortDirection) {
      params = params
        .append('sortDirection', loadCustomers.sortDirection)
        .append('sortCriteria', loadCustomers.sortCriteria);
    }

    const apiUrl =  `${environment.apiUrl}/customer`;

    if (loadCustomers.filter != undefined) {
      params = params.append('status', loadCustomers.filter);
    }

    return this.http
      .get<{ items: Customer[]; totalCount: number }>(apiUrl, { params })
      .pipe(
        map((response) => ({
          customers: response.items,
          totalCount: response.totalCount,
        }))
      );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(environment.apiUrl + '/customer/' + id);
  }

  addCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(environment.apiUrl + '/customer', customer);
  }

  updateCustomer(customer: UpdateCustomer): Observable<UpdateCustomer> {
    return this.http.put<UpdateCustomer>(
      environment.apiUrl + '/customer',
      customer
    );
  }

  deleteCustomer(customerIds: number[]): Observable<{}> {
    console.log(customerIds);
    return this.http.delete(environment.apiUrl + '/customer/', {
      body: customerIds,
      responseType: 'text',
    });
  }
}
