import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadInternships } from '../../core/store/actions/internships.actions';
import {
  Internship,
  FilterInternship,
} from '../../core/models/internship.model';
import {
  selectInternships,
  selectLoading,
  selectError,
  selectTotalNumber,
} from '../../core/store/selectors/internships.selector';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
})
export class InternshipsComponent implements OnInit {
  internships$: Observable<Internship[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  totalNumber$: Observable<number>;

  searchQuery: string = '';
  filters: FilterInternship = {};
  sortBy: string = '';
  isFilterSidebarVisible: boolean = false;

  itemsPerPage: number = 5;
  pageIndex: number = 0;

  constructor(private store: Store) {
    this.internships$ = this.store.select(selectInternships);
    this.totalNumber$ = this.store.select(selectTotalNumber);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.loadInternships();
  }

  loadInternships(): void {
    const filter: FilterInternship = {
      ...this.filters,
      title: this.searchQuery,
      sortBy: this.sortBy,
    };

    this.store.dispatch(
      loadInternships({
        offset: this.pageIndex,
        limit: this.itemsPerPage,
        filter,
      })
    );
    this.totalNumber$.subscribe((total) => {
      console.log('Total number of internships:', total);
    });    
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadInternships();
  }

  onFiltersChanged(filters: FilterInternship): void {
    this.filters = { ...this.filters, ...filters };
    this.loadInternships();
  }

  onSortChanged(sortBy: string): void {
    this.sortBy = sortBy;
    this.loadInternships();
  }

  onSearchChange(): void {
    this.loadInternships();
  }

  toggleFilterSidebar(): void {
    this.isFilterSidebarVisible = !this.isFilterSidebarVisible;
    this.totalNumber$.subscribe((total) => {
      console.log('Total number of internships:', total);
    });
    
  }
}
