import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_SUCCESS,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_SUCCESS,
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_FAIL,
  LOAD_CUSTOMERS_SUCCESS,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
} from '../actions/customers.actions';
import { catchError, map, mergeMap, of, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  LoadCustomers,
  UpdateCustomer,
} from '../../models/customer.model';
import { Customer } from '../../models/customer.model';

@Injectable()
export class CustomersEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomersService
  ) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_CUSTOMERS),
      mergeMap(
        (action: { loadCustomer: LoadCustomers }): Observable<Action> =>
          this.customerService.loadCustomers(action.loadCustomer).pipe(
            map(({ customers, totalCount }) =>
              LOAD_CUSTOMERS_SUCCESS({ customers: customers, totalCount })
            ),
            catchError((error: HttpErrorResponse) =>
              of(LOAD_CUSTOMERS_FAIL({ error: error.message }))
            )
          )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_CUSTOMER),
      switchMap((action) =>
        this.customerService.addCustomer(action.customer).pipe(
          map(() =>
            LOAD_CUSTOMERS({ loadCustomer: { pageNumber: 1, pageSize: 10 } })
          ),
          catchError((error) => {
            console.log('An error occurred!', error);
            return of(error);
          })
        )
      )
    )
  );

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_CUSTOMER),
      switchMap(
        (action: { id: number }): Observable<Action> =>
          this.customerService.getCustomer(action.id).pipe(
            map((response: Customer) =>
              LOAD_CUSTOMER_SUCCESS({ data: response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(LOAD_CUSTOMERS_FAIL({ error: error.message }))
            )
          )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_CUSTOMER),
      switchMap((action: { customer: UpdateCustomer }) =>
        this.customerService.updateCustomer(action.customer).pipe(
          map((updatedCustomer) =>
            UPDATE_CUSTOMER_SUCCESS({ data: updatedCustomer })
          ),
          catchError((error: HttpErrorResponse) =>
            of(UPDATE_CUSTOMER_FAIL({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DELETE_CUSTOMER),
      switchMap((action: { customerIds: number[] }) =>
        this.customerService.deleteCustomer(action.customerIds).pipe(
          map(() => DELETE_CUSTOMER_SUCCESS()),
          catchError((error: HttpErrorResponse) => {
            console.log('An error occured!', error);
            return of(DELETE_CUSTOMER_FAILURE({ error }));
          })
        )
      )
    )
  );
}
