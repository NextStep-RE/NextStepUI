import { createReducer, on } from '@ngrx/store';
import {
  Customer,
  UpdateCustomer,
} from '../../../../core/models/customer.model';
import {
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_SUCCESS,
  LOAD_CUSTOMER_SUCCESS,
  LOAD_CUSTOMERS_FAIL as LOAD_CUSTOMERS_FAIL,
  LOAD_CUSTOMERS_SUCCESS as LOAD_CUSTOMERS_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
} from '../actions/customers.actions';

export interface ICustomerState {
  customers: Customer[];
  totalCount: number;
  isLoading: boolean;
  error: string;
  newCustomer: Partial<Customer>;
  selectedCustomer?: Customer;
  updatedCustomer?: UpdateCustomer;
}

const INITIAL_STATE: ICustomerState = {
  customers: [],
  totalCount: 0,
  isLoading: false,
  error: '',
  newCustomer: {},
};

export const CUSTOMER_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    LOAD_CUSTOMERS_SUCCESS,
    (
      state: ICustomerState,
      action: { customers: Customer[]; totalCount: number }
    ): ICustomerState => ({
      ...state,
      customers: action.customers,
      totalCount: action.totalCount,
    })
  ),
  on(
    LOAD_CUSTOMERS_FAIL,
    (state: ICustomerState, action: { error: string }): ICustomerState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    LOAD_CUSTOMER_SUCCESS,
    (state: ICustomerState, action: { data: Customer }): ICustomerState => ({
      ...state,
      selectedCustomer: action.data,
    })
  ),
  on(
    UPDATE_CUSTOMER_SUCCESS,
    (
      state: ICustomerState,
      action: { data: UpdateCustomer }
    ): ICustomerState => ({
      ...state,
      updatedCustomer: action.data,
    })
  ),
  on(
    UPDATE_CUSTOMER_FAIL,
    (state: ICustomerState, action: { error: string }): ICustomerState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    DELETE_CUSTOMER,
    (state: ICustomerState, action: { customerIds: number[] }) => ({
      ...state,
      customers: state.customers.map((customer) =>
        action.customerIds.includes(customer.id)
          ? { ...customer, status: false }
          : customer
      ),
    })
  ),
  on(DELETE_CUSTOMER_SUCCESS, (state: ICustomerState) => {
    return {
      ...state,
      loading: false,
      success: true,
    };
  }),
  on(DELETE_CUSTOMER_FAILURE, (state, action: { error: string }) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);
