import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICustomerState } from '../reducers/customers.reducer';

// TODO: Change const names to UPPER_CASE?
export const SELECT_CUSTOMER_STATE =
  createFeatureSelector<ICustomerState>('customers');

export const SELECT_CUSTOMERS = createSelector(
  SELECT_CUSTOMER_STATE,
  (state) => state.customers
);

export const SELECT_TOTAL_COUNT = createSelector(
  SELECT_CUSTOMER_STATE,
  (state) => state.totalCount
);

export const SELECT_SELECTED_CUSTOMER = createSelector(
  SELECT_CUSTOMER_STATE,
  (state) => state.selectedCustomer
);

export const SELECT_CUSTOMERS_ERROR = createSelector(
  SELECT_CUSTOMER_STATE,
  (state) => state.error
);
