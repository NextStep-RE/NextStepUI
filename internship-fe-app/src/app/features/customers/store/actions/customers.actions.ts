import { createAction, props } from '@ngrx/store';
import {
  Customer,
  LoadCustomers,
  UpdateCustomer,
} from '../../../../core/models/customer.model';

export const LOAD_CUSTOMERS = createAction(
  '[Customers] Load Customers',
  props<{
    loadCustomer: LoadCustomers;
  }>()
);

export const LOAD_CUSTOMER = createAction(
  '[Customers] Load Customer',
  props<{ id: number }>()
);

export const LOAD_CUSTOMER_SUCCESS = createAction(
  '[Customers] Load Customer Success',
  props<{ data: Customer }>()
);

export const LOAD_CUSTOMERS_SUCCESS = createAction(
  '[Customers] Load Customers Success',
  props<{ customers: Customer[]; totalCount: number }>()
);

export const LOAD_CUSTOMERS_FAIL = createAction(
  '[Customers] Load Customers Fail',
  props<{ error: string }>()
);

export const ADD_CUSTOMER = createAction(
  '[Customer] Add Customer',
  props<{ customer: Partial<Customer> }>()
);

export const UPDATE_CUSTOMER = createAction(
  '[Customer] Update Customer',
  props<{ customer: UpdateCustomer }>()
);

export const UPDATE_CUSTOMER_SUCCESS = createAction(
  '[Customer] Update Customer Success',
  props<{ data: UpdateCustomer }>()
);

export const UPDATE_CUSTOMER_FAIL = createAction(
  '[Customer] Update Customer Fail',
  props<{ error: string }>()
);

export const DELETE_CUSTOMER = createAction(
  '[Customer] Delete Customer',
  props<{ customerIds: number[] }>()
);

export const DELETE_CUSTOMER_SUCCESS = createAction(
  '[Customer] Delete Customer Success'
);

export const DELETE_CUSTOMER_FAILURE = createAction(
  '[Customer] Delete Customer Failure',
  props<{ error: any }>()
);
