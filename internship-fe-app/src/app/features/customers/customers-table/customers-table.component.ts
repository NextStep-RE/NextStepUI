import {
  AfterViewInit,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailedDialogComponent } from '../customer-detailed-dialog/customer-detailed-dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Customer } from '../../../core/models/customer.model';
import { ICustomerState } from '../store/reducers/customers.reducer';
import {
  SELECT_CUSTOMERS,
  SELECT_CUSTOMERS_ERROR,
  SELECT_TOTAL_COUNT,
} from '../store/selectors/customers.selectors';
import {
  DELETE_CUSTOMER,
  LOAD_CUSTOMERS,
} from '../store/actions/customers.actions';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent implements OnInit, AfterViewInit {
  @Output() page!: EventEmitter<PageEvent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customers$!: Observable<Customer[]>;
  totalCount$!: Observable<number>;
  customersError$!: Observable<string>;

  allChecked: boolean = false;
  selectedCustomers: Set<number> = new Set();
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'date',
    'status',
    'actions',
  ];
  pageSize: number = 5;
  pageIndex: number = 0;
  searchValue: string | undefined;
  sortDirection: string | undefined;
  sortCriteria: string | undefined;
  filter: boolean | undefined;

  constructor(
    private store: Store<ICustomerState>,
    public matDialog: MatDialog,
    private destroyRef: DestroyRef
  ) {
    this.customers$ = this.store.select(SELECT_CUSTOMERS);
    this.customersError$ = this.store.select(SELECT_CUSTOMERS_ERROR);
    this.totalCount$ = this.store.select(SELECT_TOTAL_COUNT);
  }

  ngOnInit(): void {
    this.customers$.subscribe((customers) => {
      this.dataSource.data = customers;
      this.allChecked = this.dataSource.data.every((customer) =>
        this.selectedCustomers.has(customer.id)
      );
    });

    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadCustomers());
    this.dataSource.sort = this.sort;
    this.sort.sortChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((sortState) => this.onSortChange(sortState));
  }

  private loadCustomers(): void {
    this.store.dispatch(
      LOAD_CUSTOMERS({
        loadCustomer: {
          pageNumber: this.pageIndex + 1,
          pageSize: this.pageSize,
          searchInput: this.searchValue,
          sortDirection: this.sortDirection,
          sortCriteria: this.sortCriteria,
          filter: this.filter,
        },
      })
    );
  }

  onPageFired(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCustomers();
  }

  setSearchValue(event: string): void {
    this.searchValue = event;
    this.allChecked = false;
    this.selectedCustomers.forEach((index) => {
      this.selectedCustomers.delete(index);
    });
    this.loadCustomers();
  }

  onSortChange(sortState: Sort): void {
    this.sortDirection = sortState.direction || 'asc';
    this.sortCriteria = sortState.active || 'name';
    this.allChecked = false;
    this.selectedCustomers.forEach((index) => {
      this.selectedCustomers.delete(index);
    });
    this.loadCustomers();
  }

  checkOrUncheckAll(checked: boolean): void {
    this.allChecked = checked;
    if (checked) {
      for (const customer of this.dataSource.data) {
        this.selectedCustomers.add(customer.id);
      }
    } else {
      for (const customer of this.dataSource.data) {
        this.selectedCustomers.delete(customer.id);
      }
    }
  }

  updateIndividualCheckbox(index: number, checked: boolean): void {
    if (checked) {
      this.selectedCustomers.add(index);
    } else {
      this.selectedCustomers.delete(index);
    }
    this.allChecked = this.dataSource.data.every((customer) =>
      this.selectedCustomers.has(customer.id)
    );
  }

  onDeleteCustomer(
    customerId?: number,
    selectedCustomers: Set<number> = new Set()
  ): void {
    if (customerId) {
      const customer = this.dataSource.data.find((c) => c.id === customerId);
      if (customer && customer.status === true) {
        if (
          confirm(`Are you sure you want to delete customer: ${customer.name}?`)
        ) {
          this.store.dispatch(DELETE_CUSTOMER({ customerIds: [customerId] }));
          this.selectedCustomers.delete(customerId);
        }
      } else if (customer && customer.status === false) {
        alert('This customer is already inactive');
      } else {
        console.error('Customer not found');
      }
    } else if (this.selectedCustomers.size > 0) {
      const inactiveCustomers = Array.from(this.selectedCustomers).filter(
        (id) => {
          const customer = this.dataSource.data.find((c) => c.id === id);
          return customer && customer.status === false;
        }
      );

      if (inactiveCustomers.length > 0) {
        alert(
          `Some selected customers are already inactive. They will be unchecked.`
        );
        inactiveCustomers.forEach((id) => {
          this.selectedCustomers.delete(id);
        });
      }

      if (this.selectedCustomers.size > 0) {
        if (
          confirm(
            `Are you sure you want to delete ${this.selectedCustomers.size} customers?`
          )
        ) {
          const customerIds = Array.from(this.selectedCustomers);
          this.store.dispatch(DELETE_CUSTOMER({ customerIds }));
          this.selectedCustomers.clear();
        }
      } else {
        alert('No active customers selected for deletion');
      }
    } else {
      alert('No customers selected');
    }
    this.allChecked = false;
  }

  onViewCustomer(customer: Customer): void {
    this.matDialog.open(CustomerDetailedDialogComponent, {
      width: 'fit-content',
      height: '80%',
      data: customer,
    });
  }

  onTabChange(tabIndex: number): void {
    switch (tabIndex) {
      case 0:
        this.filter = undefined;
        this.allChecked = false;
        this.selectedCustomers.forEach((index) => {
          this.selectedCustomers.delete(index);
        });
        this.loadCustomers();
        break;
      case 1:
        this.filter = true;
        this.allChecked = false;
        this.selectedCustomers.forEach((index) => {
          this.selectedCustomers.delete(index);
        });
        this.loadCustomers();
        break;
      case 2:
        this.filter = false;
        this.allChecked = false;
        this.selectedCustomers.forEach((index) => {
          this.selectedCustomers.delete(index);
        });
        this.loadCustomers();
        break;
      default:
        break;
    }
  }
}
